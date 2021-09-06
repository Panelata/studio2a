import React from 'react';
import styles from "./studentHome.module.css"

const StudentHome = () => {
	return (
		<div>
			<h1>student homepage </h1>
			<div className={styles.mainContainer}>This is the student box</div>
		</div>
	)
}

export default StudentHome;