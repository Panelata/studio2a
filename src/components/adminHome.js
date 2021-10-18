import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./adminHome.module.css"

const AdminHome = () => {
	return (
		<div>
			<h1> Welcome to the admin Homepage </h1>

			<div>
				<button type="button" className={styles.theButton}>Notifications </button>
			</div>

			<div className={styles.boxcontainer}>
				<div className={styles.box1}> <Link to={{
					pathname: "/admin/class",
					subjectName: "Software Engineering Studio 1a"
				}}>Software Engineering Studio 1a</Link></div>
				<div className={styles.box2}>
					<Link to={{
						pathname: "/admin/class",
						subjectName: "Software Engineering Studio 1a"
					}}>Software Engineering Studio 2b</Link>
				</div>
				<div className={styles.box3}>
					<Link to={{
						pathname: "/admin/class",
						subjectName: "Data Structures and Algorithms"
					}}>Data Structures and Algorithms</Link>
				</div>
				<div className={styles.box4}>
					<Link to={{
						pathname: "/admin/class",
						subjectName: "Programming Fundamentals"
					}}>Programming Fundamentals</Link>
				</div>
			</div>


		</div>
	)
}

export default AdminHome;
