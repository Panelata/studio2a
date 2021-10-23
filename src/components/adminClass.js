import React from 'react';
import styles from "./adminClass.module.css";
import { Link } from "react-router-dom";

const AdminClass = (props) => {
	const { subjectName } = props.location;
	console.log(props.location.subjectID);
	
	return (
		<div>
			<div>
				<h2>
					Welcome To {subjectName}
				</h2>
				<br></br><br></br>
			</div>

			<div className={styles.boxcontainer}>
				<div className={styles.box1}> <Link to={{
					pathname: "/admin/class/project",
					subjectName: subjectName,
					subjectID: props.location.subjectID
				}}>Create Project</Link></div>
				<div className={styles.box2}>
					<Link to={{
						pathname: "/admin/manage-groups",
						subjectName: subjectName,
						subjectID: props.location.subjectID
					}}>
						Manage Groups
					</Link>
				</div>
			</div>

		</div>
	)
}

export default AdminClass;