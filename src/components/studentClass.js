import React from 'react';
import styles from "./studentClass.module.css";
import { Link } from "react-router-dom";



// // TODO: update api functions for the GetSurvey and GetGroup to actually return data, currently they are just returning bools

// /**
//  * Attempts to fetch a survey from the db and return whether it is true or not  
//  * @param {string} subjectName The identifier for the subject being fetched
//  * @returns boolean value as to whether there is a survey available for that subject for that student 
//  */
// const GetSurvey = async (subjectName) => {
// 	try {
// 		const surveyFetch = await fetch('http://127.0.0.1:8000/surveys', {
// 			method: 'POST',
// 			body: JSON.stringify({
// 				subjectName,
// 			})
// 		})

// 		return !!surveyFetch; //returns a boolean depending on results

// 	} catch (error) {
// 		console.error(error);
// 		return false;
// 	}
// }

// /**
//  * Gets the student's group  and returns a bool for if the student is assigned a group
//  * @param {string} subjectName The identifier for the subject being fetched
//  * @param {string} studentId The identifier for the student's group being fetched
//  * @returns boolean value as to whether there is a group for that student forthe subject
//  */
// const GetGroup = async (subjectName, studentId = "student1") => {
// 	try {
// 		const groupFetch = await fetch('http://127.0.0.1:8000/groups', {
// 			method: 'POST',
// 			body: JSON.stringify({
// 				subjectName,
// 				studentId
// 			})
// 		})

// 		return !!groupFetch; //returns a boolean depending on results

// 	} catch (error) {
// 		console.error(error);
// 		return false;
// 	}
// }

const StudentClass = (props) => {
	const { subjectName } = props.location;
	console.log(props.location.subjectID);
	//const surveyAvailable = GetSurvey(subjectName);
	//const assignedGroup = GetGroup(subjectName);

	return (
		<div>
			<h1>Welcome to {subjectName}</h1>
			<div className={styles.options}>
				<div className={styles.column}>
					{/* TODO: flip disabled prop for enrolled group once backend is setup (should be disable if a group doesn't exist) */}
					<button className={styles.btn} >View enrolled group</button>
					<button className={styles.btn}>View all groups</button>
				</div>
				<div className={styles.box1}> <Link to={{
						pathname: "/student/class/project",
						subjectName: subjectName,
						subjectID: props.location.subjectID
					}}>Create Project</Link></div>
			</div>
		</div>
	)
}

export default StudentClass;