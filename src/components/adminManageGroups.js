import React, { useState } from 'react';
import styles from "./adminManageGroups.module.css";
import kmeans from "node-kmeans";
import { Layer } from "grommet";
import axios from "axios";
import FormatGroupResponse from '../Utils/FormatGroupResponse';
import MergeSurveyResponses from '../Utils/MergeSurveyResponses';

const data = [
	{ 'fistName': 'Tobias Snyder', 'preference-a': 1, 'preference-b': 100 },
	{ 'fistName': 'Brandon Richards', 'preference-a': 2, 'preference-b': 200 },
	{ 'fistName': 'Samanta Maldonado', 'preference-a': 3, 'preference-b': 300 },
	{ 'fistName': 'Faiza Rose', 'preference-a': 4, 'preference-b': 400 },
	{ 'fistName': 'Zephaniah Wang', 'preference-a': 5, 'preference-b': 200 },
	{ 'fistName': 'Willis Partridge', 'preference-a': 1, 'preference-b': 8700 },
	{ 'fistName': 'Shannan George', 'preference-a': 2, 'preference-b': 60420 },
	{ 'fistName': 'Ishika Dominguez', 'preference-a': 3, 'preference-b': 98787 },
	{ 'fistName': 'Thelma Summers', 'preference-a': 4, 'preference-b': 716 },
	{ 'fistName': 'Carlie Irving', 'preference-a': 5, 'preference-b': 11567 },
	{ 'fistName': 'Lilly-Mai Barber', 'preference-a': 1, 'preference-b': 6426 },
	{ 'fistName': 'Osman Tate', 'preference-a': 2, 'preference-b': 8700 },
	{ 'fistName': 'Annaliese Coulson', 'preference-a': 3, 'preference-b': 60420 },
	{ 'fistName': 'Kaan Mcleod', 'preference-a': 3, 'preference-b': 98787 },
	{ 'fistName': 'Constance Ho', 'preference-a': 4, 'preference-b': 716 },
	{ 'fistName': 'Saanvi French', 'preference-a': 5, 'preference-b': 11567 },
	{ 'fistName': 'Igor Wicks', 'preference-a': 1, 'preference-b': 6426 },
	{ 'fistName': 'Scott Devine', 'preference-a': 2, 'preference-b': 8700 },
	{ 'fistName': 'Elora King', 'preference-a': 3, 'preference-b': 8700 },
	{ 'fistName': 'Mylie Sheehan', 'preference-a': 4, 'preference-b': 8700 },
];

let vectors = new Array();
for (let i = 0; i < data.length; i++) {
	vectors[i] = [data[i]['preference-a'], data[i]['preference-b']];
}

function FormatGroupsData(groups) {
	console.log("kmeans raw groups", groups)
	let formattedGroups = groups.map(cluster =>
		cluster.clusterInd.map(index => data[index])
	);
	console.log("Formatted Groups", formattedGroups)
	return formattedGroups;
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
		console.log("Response", res);
	} catch (err) {
		console.error(err);
	}
}

const GetSurveyResults = async (projectID) => {
	try {
		let res = await axios.get(`http://127.0.0.1:8000/survey/responses?projectID=${projectID}`);
		console.log("GetSurveyResults Response", res);
		MergeSurveyResponses(res.data);
	} catch (err) {
		console.error(err);
	}
}

const AdminManageGroups = (props) => {
	const [groups, setGroups] = useState([])
	const [isSettingGroups, setIsSettingGroups] = useState(false);
	const [showGroups, setShowGroups] = useState(false);
	const [students, setStudents] = useState([]);
	const [showStudents, setShowStudents] = useState(false);
	const { subjectName, projectID, projectName, projectSize } = props.location;

	const callCluster = async () => {
		if (isSettingGroups) return "";
		setIsSettingGroups(true);
		console.log(vectors)
		kmeans.clusterize(vectors, { k: projectSize }, (err, res) => {
			if (err) console.error(err);
			else {
				setGroups(FormatGroupsData(res));
			};
		});
		setIsSettingGroups(false);
	}

	const GenerateGroups = async () => {
		GetSurveyResults(projectID)
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
		console.log("Get Students called!")
		let { data: students } = await axios.get(`http://127.0.0.1:8000/survey/students?projectID=${projectID}`);
		students && setStudents(students);
		console.log("Students", students);
	};

	//Called on initial mount
	React.useEffect(() => {
		getGroups();
		getStudents();
	}, []);

	return (
		<div style={{ auto: "max-content" }}>
			<h1>NOTE: the user data is still being worked on for this page</h1>
			<h2>{subjectName} > Project: {projectName}</h2>
			<button className={styles.btn} onClick={toggleShowStudents}
				style={{ width: "max-content", height: "max-content", padding: "14px", marginTop: "30px" }}
			>Show students eligible for groups</button>
			<div className={styles.options}>
				<div className={styles.column}>
					<button className={styles.btn} disabled={!groups || groups.length == 0} onClick={toggleShowGroups}>View all groups</button>
				</div>
				<div className={styles.column}>
					<button className={styles.btn} onClick={GenerateGroups}>Generate Groups</button>
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
		</div>
	)
}

export default AdminManageGroups;