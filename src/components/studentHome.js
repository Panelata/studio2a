import React from 'react';
import styles from "./studentHome.module.css"
import "./studentHomeStyles.css"
import { Link } from 'react-router-dom';

// example class list for demo before db connection
const allClasses = [
	{
		classId: 1,
		className: "Autumn 2021",
		classSubjects: [
			{
				id: "68037",
				name: "Physical Modelling"
			},
			{
				id: "33130",
				name: "Mathematical Modelling 1"
			},
			{
				id: "26100",
				name: "Integrating Business Perspectives"
			},
			{
				id: "48230",
				name: "Engineering Communication"
			},
		]
	},
	{
		classId: 2,
		className: "Spring 2021",
		classSubjects: [
			{
				id: "01231234",
				name: "Software Engineering Studio 1A"
			},
			{
				id: "48240",
				name: "Design and Innovation Fundamentals"
			},
			{
				id: "33230",
				name: "Mathematical Modelling 2"
			},
			{
				id: "48023",
				name: "Programming Fundamentals	"
			},
		]
	},
];

const StudentHome = () => {
	return (
		<div className="group-arrangement-pg-wrapper">
			<div className="group-arrangement-pg-container">
				<div className="page-heading-container">
					<h1 className="page-heading">Group Arrangement</h1>
				</div>
				<div className={`${styles.mainContainer} main-data-container`}>
					<h3 className="all-groups-single-head">Group arrangements for subjects below: </h3>
					{allClasses.length > 0 ? allClasses.map((classItem, index) => {
						return (
							<div className="group-head-and-group-row-container">
								<h3 className="group-head-name">{classItem.className}</h3>
								<div className="subjects-group-container">
									{classItem.classSubjects.map(studentClass =>
										<div key={studentClass.id} className="subject-container">
											<Link to={{
												pathname: "/student/class",
												subjectName: studentClass.name
											}}
											>{studentClass.name}</Link>
										</div>
									)}
								</div>
							</div>
						);
					})
						:
						(<div className="error-no-joining">Sorry you haven't joined/been added to any classes yet</div>)
					}

				</div>
			</div>
		</div>
	)
}

export default StudentHome;