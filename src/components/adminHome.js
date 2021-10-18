import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./adminHome.module.css"

const AdminHome = () => {
	return (
		<div>
			<h1> This is the admin Homepage </h1>
			<div>
				<button type="button" className={styles.theButton}>Notifications </button>
			</div>
			<div className={styles.boxcontainer}>
				<div className={styles.box1}>
					<Link to={{
						pathname: "/admin/class",
					}}
					>Subject A
					</Link></div>
				<div className={styles.box2}> Subject B </div>
				<div className={styles.box3}> Subject C </div>
				<div className={styles.box4}> Subject D </div>
			</div>
		</div>
	)
}

export default AdminHome;
