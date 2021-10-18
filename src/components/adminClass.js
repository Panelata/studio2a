import React from 'react';
import styles from "./adminClass.module.css"

const AdminClass = (props) => {
	const { subjectName } = props.location;
	return (
		<div>
			<div>
				<h2>
					{subjectName}
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

export default AdminClass;