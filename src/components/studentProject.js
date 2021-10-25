//To save time lets just hard code the skills

import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styles from "./studentProject.module.css"
import { Link } from 'react-router-dom';
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
		<div>
			<h1>Viewing Project: {props.location.projectName}</h1>
			<div className={styles.options}>
				<div className={styles.column}>
					{/* TODO: flip disabled prop for enrolled group once backend is setup (should be disable if a group doesn't exist) */}
					<button className={styles.btn} >View enrolled group</button>
					<button className={styles.btn} onClick={toggleViewProjects}>View all groups</button>
				</div>
				<div className={styles.column}>
					<div className={styles.btn}>
						<Link className={styles.link} to={{
							pathname: "/student/class/project/completeSurvey",
							projectID: props.location.projectID,
							projectName: props.location.projectName,
						}}>Take survey to assign yourself to a group</Link>
					</div>
				</div>
			</div>
			{viewProjects && <div ref={groupsRef}><StudentShowGroups projectID={props.location.projectID} /></div>}
		</div>
	)
}

export default StudentProject;