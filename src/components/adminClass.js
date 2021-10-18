import React from 'react';
import styles from "./studentClass.module.css";


// TODO: update api functions for the GetSurvey and GetGroup to actually return data, currently they are just returning bools


const AdminClass = (props) => {
	const { subjectName } = props.location;

	return (
		<div>
			<h1>Welcome to {subjectName}</h1>
			<div className={styles.options}>
				<div className={styles.column}>
					{/* TODO: flip disabled prop for enrolled group once backend is setup (should be disable if a group doesn't exist) */}
					<button className={styles.btn} >View Current Groups</button>
					<button className={styles.btn}>Generate Groups</button>
				</div>
				<div className={styles.column}>
					<button className={styles.btn} >Take the survey to assign yourself to a group</button>
				</div>
			</div>
		</div>
	)
}

export default AdminClass;