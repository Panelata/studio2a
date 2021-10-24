import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from './auth';


class Subject extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  count: 0
		};
	  }

	render(){
	const{ subjectID, subjectName } = this.props.subject;

	const userType = auth.getUserType();

		return(
			<tr>
				<td style= {{textAlign: "center"}}>{subjectID}</td>
				<td> {subjectName} </td>
				<td>

					{(userType === "student" && 				
					<Link to={{
					pathname: "/student/class",
					subjectName: subjectName,
					subjectID: subjectID
					}}>View Projects</Link>)
					
					|| (userType === "admin" && 				
					<Link to={{
					pathname: "/admin/class",
					subjectName: subjectName,
					subjectID: subjectID
					}}>Manage Class</Link>)}
			
				</td>
			</tr>

		);
	}
}

export default Subject;
