import React from 'react';
import styles from "./adminClass.module.css"
import { Link } from 'react-router-dom';

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
				<div className={styles.box2}>
					<Link to={{
						pathname: "/admin/manage-groups",
						subjectName: "Programming Fundamentals"
					}}>
						Manage Groups
					</Link>
				</div>
			</div>

		</div>
	)
}

export default AdminClass;