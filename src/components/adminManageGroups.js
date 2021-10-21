import React, { useState } from 'react';
import styles from "./adminManageGroups.module.css";
import kmeans from "node-kmeans";



const data = [
	{ 'name': 'Tobias Snyder', 'preference-a': 1, 'preference-b': 100 },
	{ 'name': 'Brandon Richards', 'preference-a': 2, 'preference-b': 200 },
	{ 'name': 'Samanta Maldonado', 'preference-a': 3, 'preference-b': 300 },
	{ 'name': 'Faiza Rose', 'preference-a': 4, 'preference-b': 400 },
	{ 'name': 'Zephaniah Wang', 'preference-a': 5, 'preference-b': 200 },
	{ 'name': 'Willis Partridge', 'preference-a': 1, 'preference-b': 8700 },
	{ 'name': 'Shannan George', 'preference-a': 2, 'preference-b': 60420 },
	{ 'name': 'Ishika Dominguez', 'preference-a': 3, 'preference-b': 98787 },
	{ 'name': 'Thelma Summers', 'preference-a': 4, 'preference-b': 716 },
	{ 'name': 'Carlie Irving', 'preference-a': 5, 'preference-b': 11567 },
	{ 'name': 'Lilly-Mai Barber', 'preference-a': 1, 'preference-b': 6426 },
	{ 'name': 'Osman Tate', 'preference-a': 2, 'preference-b': 8700 },
	{ 'name': 'Annaliese Coulson', 'preference-a': 3, 'preference-b': 60420 },
	{ 'name': 'Kaan Mcleod', 'preference-a': 3, 'preference-b': 98787 },
	{ 'name': 'Constance Ho', 'preference-a': 4, 'preference-b': 716 },
	{ 'name': 'Saanvi French', 'preference-a': 5, 'preference-b': 11567 },
	{ 'name': 'Igor Wicks', 'preference-a': 1, 'preference-b': 6426 },
	{ 'name': 'Scott Devine', 'preference-a': 2, 'preference-b': 8700 },
	{ 'name': 'Elora King', 'preference-a': 3, 'preference-b': 8700 },
	{ 'name': 'Mylie Sheehan', 'preference-a': 4, 'preference-b': 8700 },
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


const AdminManageGroups = (props) => {
	const [groups, setGroups] = useState([])
	const [isSettingGroups, setIsSettingGroups] = useState(false);
	const [showGroups, setShowGroups] = useState(false)
	const { subjectName } = props.location;

	const callCluster = async () => {
		if (isSettingGroups) return "";
		setIsSettingGroups(true);

		kmeans.clusterize(vectors, { k: 10 }, (err, res) => {
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
			<h1>Managing groups for {subjectName}</h1>
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
						<div
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