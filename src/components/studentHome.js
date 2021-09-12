import React from 'react';
import styles from "./studentHome.module.css"
import { Link } from 'react-router-dom';

// dumby class list for demo before db connection
const classes = [
	{
		id: "01231234",
		name: "class_1"
	},
	{
		id: "89786231",
		name: "class_2"
	},
	{
		id: "89712121",
		name: "class_3"
	}
];

const StudentHome = () => {
	return (
		<div>
			<h1>student homepage </h1>
			<div className={styles.mainContainer}>This is the student box
				{classes ? (classes.map(studentClass => 
					<div key={studentClass.id}>
					<Link to={{
						pathname: "/student/class",
						subjectName: studentClass.name
					}}
					>View {studentClass.name}!</Link>
					</div>
				)) :
					(<div>Sorry you haven't joined/been added to any classes yet</div>)
				}
			</div>
		</div>
	)
}

export default StudentHome;