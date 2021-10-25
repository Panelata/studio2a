//To save time lets just hard code the skills

import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styles from "./studentProject.module.css"
import { Link } from 'react-router-dom';
import Card from "@mui/material/Card";
import StudentShowGroups from './studentShowGroups';

const StudentProject = (props) => {
	const [viewProjects, setViewProjects] = useState(false);
	const groupsRef = useRef(null);

	const toggleViewProjects = () => {
		setViewProjects(!viewProjects);
	}
	React.useEffect(() => {
		if (viewProjects) {
			groupsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}, [viewProjects]);

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
				<h1>Viewing Project: {props.location.projectName}</h1>
				<div className={styles.options}>
					<div className={styles.column}>
						{/* TODO: flip disabled prop for enrolled group once backend is setup (should be disable if a group doesn't exist) */}
						<button className={styles.btn} >View enrolled group</button>
						<button className={styles.btn} onClick={toggleViewProjects}>View all groups</button>
					</div>
					<div className={styles.column}>
						<div className={styles.btn} style={{width: "auto"}}>
							<Link className={styles.link} to={{
								pathname: "/student/class/project/completeSurvey",
								projectID: props.location.projectID,
								projectName: props.location.projectName,
							}}>Take survey to assign yourself to a group</Link>
						</div>
					</div>
				</div>
				{viewProjects && <div ref={groupsRef}><StudentShowGroups projectID={props.location.projectID} /></div>}
			</Card>
		</div>
	)
}

export default StudentProject;