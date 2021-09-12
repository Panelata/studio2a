import React from 'react';
import styles from "./studentClass.module.css";

const StudentClass = (props) => {
	const { subjectName } = props.location;
	return (
		<div>
			<h1>Welcome to {subjectName}</h1>
			<div className={styles.options}>
				<div className={styles.column}>
					<h3>Group Options</h3>
					<div>Join a group or see your current group</div>
					<div>View all groups</div>	
				</div>
				<div className={styles.column}>
					<h3>Surveys</h3>
					<div>Take the available survey</div>
				</div>
			</div>
		</div>
	)
}

export default StudentClass;