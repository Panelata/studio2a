import React from 'react';
import styles from "./adminHome.module.css"
import { Link } from 'react-router-dom';


// example class list for demo before db connection
const classes = [
	{
		id: "01231234",
		name: "Software Engineering Studio 1a"
	},
	{
		id: "89786231",
		name: "Data Structures and Algorithms"
	},
	{
		id: "89712121",
		name: "Engineering Communication"
	},

];

const AdminHome = () => {
	return (
		<div>

			<h1> Admin Homepage </h1>
			<button type="button" className={styles.notificationButton}>Notifications </button>
			
			<div>
				{classes ? (classes.map(adminClass => 
					<div className={styles.box1} key={adminClass.id}>
					<Link to={{
						pathname: "/admin/class",
						subjectName: adminClass.name
					}}
					>View {adminClass.name}</Link>

					</div>
				)) :
					(<div>Sorry you haven't joined/been added to any classes yet</div>)
				}
			</div>


		</div>
			
		
	)
}

export default AdminHome;
