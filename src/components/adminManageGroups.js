import React, { useState } from 'react';
import styles from "./adminManageGroups.module.css";
import kmeans from "node-kmeans";
import { Layer } from "grommet";
import axios from "axios";
import FormatGroupResponse from '../Utils/FormatGroupResponse';
import MergeSurveyResponses from '../Utils/MergeSurveyResponses';
import ArrangeGroups from '../Utils/ArrangeGroups';
import Card from "@mui/material/Card";



function FormatGroupsData(rawClusters) {
	// let dataGroups = rawClusters.map(cluster =>
	// 	cluster.clusterInd.map(index => userSurveys[index])
	// );
	// console.log("Raw clusters", rawClusters)
	let dataGroups = Array.apply(null, Array(rawClusters.length)).map(function () { return [] });
	for (let i = 0; i < rawClusters.length; i++) {
		let clusterIndex = rawClusters[i].clusterInd;
		// console.log("cluster index", clusterIndex);
		for (let u = 0; u < clusterIndex.length; u++) {
			// console.log("Student in cluster:", userSurveys[clusterIndex[u]]);
			dataGroups[i].push(clusterIndex[u]);
		}
		// .forEach(student => { dataGroups[i].push(userSurveys[student]) });
	};
	dataGroups.sort(function (a, b) { return b.length - a.length });
	console.log(rawClusters)
	console.log("datagroups", dataGroups)
	return dataGroups;
}

/**
 * Saves groups to the database: creates a group row and add the students to that group row
 * @param {int} projectID - The id of the project being used
 * @param {int[][]} groups - Array of arrays of users
 * @param {int[]} group - Array of userIDs
 * @param {int} userID - User id to add to the group
 */
const SaveGroups = async ({ projectID, groups }) => {
	try {
		let res = await fetch('http://127.0.0.1:8000/groups/create', {
			method: 'POST',
			body: JSON.stringify({
				projectID,
				groups
			})
		})
	} catch (err) {
		console.error(err);
	}
}

const GetSurveyResults = async (projectID) => {
	try {
		let res = await axios.get(`http://127.0.0.1:8000/survey/responses?projectID=${projectID}`);
		return MergeSurveyResponses(res.data);
	} catch (err) {
		console.error(err);
		return [];
	}
}

const AdminManageGroups = (props) => {
	const [groups, setGroups] = useState([])
	const [isSettingGroups, setIsSettingGroups] = useState(false);
	const [showGroups, setShowGroups] = useState(false);
	const [students, setStudents] = useState([]);
	const [showStudents, setShowStudents] = useState(false);
	const [userSurveys, setUserSurveys] = useState([]);
	const { subjectName, projectID, projectName, projectSize } = props.location;

	const StartGenerateGroups = async () => {
		if (isSettingGroups) return "";
		setIsSettingGroups(true);
		setUserSurveys(await GetSurveyResults(projectID))
	}

	const GenerateGroups = () => {
		let vectors = new Array();
		for (let i = 0; i < userSurveys.length; i++) {
			vectors[i] = [userSurveys[i]['skillA'], userSurveys[i]['skillB']];
		}
		// numStudents/projectSize = numGoups
		// however if we have a remainder do some other stuff.
		let numClusters = () => {
			let remainder = students.length % projectSize;
			let baseNumGroups = students.length / projectSize;
			if (remainder == 0) return baseNumGroups;
			if (remainder < projectSize / 2) { return Math.floor(baseNumGroups) }
			else { return Math.floor(baseNumGroups) + 1 }
		};
		kmeans.clusterize(vectors, { k: numClusters() }, async (err, res) => {
			if (err) console.error(err);
			else {
				let formattedGroups = await FormatGroupsData(res, userSurveys);
				let idGroups = ArrangeGroups(formattedGroups, students.length, projectSize);
				await SaveGroups({ projectID, groups: idGroups });
				await getGroups();
			};
		});
		setIsSettingGroups(false);
	}

	const toggleShowGroups = () => {
		setShowGroups(!showGroups);
	}

	const toggleShowStudents = () => {
		setShowStudents(!showStudents);
	}


	/**
	 * Returns the groups from the php endpoint in an array of objects. On the frontend we are then converting that to a groups array of users arrays
	 */
	const getGroups = async () => {
		try {
			let { data } = await axios.get(`http://127.0.0.1:8000/groups/retrieve?projectID=${projectID}`);
			let formattedGroups = FormatGroupResponse(data);
			setGroups(formattedGroups);
		} catch (error) {
			console.log("Error in getGroups");
			console.error(error);
		}
	};

	const getStudents = async () => {
		let { data: students } = await axios.get(`http://127.0.0.1:8000/survey/students?projectID=${projectID}`);
		setStudents(students);
	};

	React.useEffect(() => {
		console.log("%cuseEffect gorups", "color:lime", groups)
	}, [groups]);
	//Called on initial mount
	React.useEffect(() => {
		getGroups();
		getStudents();
	}, []);

	React.useEffect(() => {
		if (isSettingGroups) {
			GenerateGroups();
		}
	}, [userSurveys]);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				// alignItems: "center",
				height: "100vh",
			}}
		>
			<Card
				sx={{
					width: "90vh",
					height: "100vh",
					paddingTop: 5,
					paddingBottom: 5,
				}}
				className="card"
			>
				<h2>{subjectName} {'>'} Project: {projectName}</h2>
				<button className={styles.btn} onClick={toggleShowStudents}
					style={{ width: "max-content", height: "max-content", padding: "14px", marginTop: "30px" }}
				>Show students eligible for groups</button>
				<div className={styles.options}>
					<div className={styles.column}>
						<button className={styles.btn} disabled={!groups || groups.length == 0} onClick={toggleShowGroups}>View all groups</button>
					</div>
					<div className={styles.column}>
						<button className={styles.btn} disabled={students.length === 0} onClick={StartGenerateGroups}>Generate Groups</button>
						<button className={styles.btn} >Generate Groups Randomly</button>
					</div>
				</div>
				{showStudents && (
					<Layer
						onEsc={toggleShowStudents}
						onClickOutside={toggleShowStudents}
					>
						<div
							style={{ border: "1px solid black", borderRadius: "20px", display: "flex", flexDirection: "column", margin: "30px", padding: "20px", width: "600px", alignItems: "center" }}>
							<div style={{ textDecoration: "underline", lineHeight: "40px" }}>Students who have completed the survey:</div>
							{students.map(student => (
								<div key={student.userID} style={{ display: "flex", flexDirection: "row", width: "100%" }}>
									<div>{student.firstName} {student.lastName}</div>
								</div>
							))}
							<button className={styles.btn}
								style={{ width: "max-content", height: "max-content", padding: "14px", marginTop: "20px" }}
								onClick={toggleShowStudents}
							>
								Close
							</button>
						</div>
					</Layer>
				)}
				<div className="groups" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
					{showGroups &&
						groups.map((group, i) =>
							<div
								style={{ border: "1px solid black", display: "flex", flexDirection: "column", margin: "30px", padding: "20px", width: "600px", alignItems: "center" }}
								key={i}>
								<div style={{ textDecoration: "underline", fontWeight: "bold" }}>Group {i + 1}</div>
								{group.map((student, index) =>
									<div key={index} style={{ display: "flex", flexDirection: "row" }}>
										<div>{student.firstName} {student.lastName}</div>
									</div>
								)}
							</div>
						)
					}
				</div>
			</Card>
		</div>
	)
}

export default AdminManageGroups;