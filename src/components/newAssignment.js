import React from 'react';
import styles from "./newAssignments.module.css"

const NewAssignment = () => {
	return (
		<div>
			<div>
				<h2>
					Subject A
				</h2>
				<br></br><br></br>
			</div>

			<div className={styles.boxcontainer}>
					<div className={styles.box1}> Create Project </div>
					<div className={styles.box2}> Manage Project </div>

			</div>

		</div>
	)
}

export default NewAssignment;