import React, { useState } from 'react';
import styles from "./adminManageGroups.module.css";
import kmeans from "node-kmeans";

const data = [
	{ 'name': 'Tobias Snyder', 'skill-a': 100, 'skill-b': 60420 },
	{ 'name': 'Brandon Richards', 'skill-a': 200, 'skill-b': 98787 },
	{ 'name': 'Samanta Maldonado', 'skill-a': 300, 'skill-b': 716 },
	{ 'name': 'Faiza Rose', 'skill-a': 400, 'skill-b': 11567 },
	{ 'name': 'Zephaniah Wang', 'skill-a': 100, 'skill-b': 6426 },
	{ 'name': 'Willis Partridge', 'skill-a': 101, 'skill-b': 8700 },
	{ 'name': 'Shannan George', 'skill-a': 300, 'skill-b': 60420 },
	{ 'name': 'Ishika Dominguez', 'skill-a': 500, 'skill-b': 98787 },
	{ 'name': 'Thelma Summers', 'skill-a': 123, 'skill-b': 716 },
	{ 'name': 'Carlie Irving', 'skill-a': 100, 'skill-b': 11567 },
	{ 'name': 'Lilly-Mai Barber', 'skill-a': 200, 'skill-b': 6426 },
	{ 'name': 'Osman Tate', 'skill-a': 1, 'skill-b': 8700 },
	{ 'name': 'Annaliese Coulson', 'skill-a': 3, 'skill-b': 60420 },
	{ 'name': 'Kaan Mcleod', 'skill-a': 3, 'skill-b': 98787 },
	{ 'name': 'Constance Ho', 'skill-a': 400, 'skill-b': 716 },
	{ 'name': 'Saanvi French', 'skill-a': 400, 'skill-b': 11567 },
	{ 'name': 'Igor Wicks', 'skill-a': 200, 'skill-b': 6426 },
	{ 'name': 'Scott Devine', 'skill-a': 300, 'skill-b': 8700 },
	{ 'name': 'Elora King', 'skill-a': 300, 'skill-b': 8700 },
	{ 'name': 'Mylie Sheehan', 'skill-a': 200, 'skill-b': 8700 },
];

let vectors = new Array();
for (let i = 0; i < data.length; i++) {
	vectors[i] = [data[i]['skill-a'], data[i]['skill-b']];
}

function FormatGroupsData(groups) {
	console.log("kmeans raw groups")
	let formattedGroups = groups.map(cluster =>
		cluster.clusterInd.map(index => data[index])
	);
	console.log("Formatted Groups", formattedGroups)
	return formattedGroups;
}


const AdminManageGroups = (props) => {
	const [groups, setGroups] = useState([])
	const [isSettingGroups, setIsSettingGroups] = useState(false);
	const [showGroups, setShowGroups] = useState(false)
	const { subjectName } = props.location;

	const callCluster = async () => {
		if (isSettingGroups) return "";
		setIsSettingGroups(true);

		kmeans.clusterize(vectors, { k: 5 }, (err, res) => {
			if (err) console.error(err);
			else {
				setGroups(FormatGroupsData(res));
			};
		});
		await setIsSettingGroups(false);
	}

	const toggleShowGroups = () => {
		setShowGroups(!showGroups);
	}

	return (
		<div style={{ auto: "max-content" }}>
			<h1>Manageing groups for {subjectName}</h1>
			<div className={styles.options}>
				<div className={styles.column}>
					<button className={styles.btn} disabled={!groups || groups.length == 0} onClick={toggleShowGroups}>View all groups</button>
				</div>
				<div className={styles.column}>
					<button className={styles.btn} onClick={callCluster}>Generate Groups</button>
					<button className={styles.btn}>Generate Groups Randomly</button>
				</div>
			</div>
			<div className="groups" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				{showGroups &&
					groups.map((group, i) =>
						<div useRef
							style={{ border: "1px solid black", display: "flex", flexDirection: "column", margin: "30px", padding: "20px", width: "600px", alignItems: "center" }}
							key={i}>
							<div style={{ textDecoration: "underline", fontWeight: "bold" }}>Group {i + 1}</div>
							{group.map((student, index) =>
								<div key={index} style={{ display: "flex", flexDirection: "row" }}>
									<div>{student.name}</div>
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