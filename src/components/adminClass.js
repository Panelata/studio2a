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
					{subjectName}
				</h2>
				<br></br><br></br>
			</div>

			<div className={styles.boxcontainer}>
				<div className={styles.box1}> <Link to={{
					pathname: "/admin/class/create-project",
					subjectName: subjectName,
					subjectID: props.location.subjectID
				}}>Create a new Project</Link></div>
				<div className={styles.box2}>
					<Link to={{
						pathname: "/admin/class/projects",
						subjectName: subjectName,
						subjectID: props.location.subjectID
					}}>
						Manage Projects
					</Link>
				</div>
			</div>

		</div>
	)
}

export default AdminClass;