import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from './auth';

class Project extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  count: 0
		};
	  }

	render(){
	const{ projectID, projectName} = this.props.survey;
	const userType = auth.getUserType();

		return(
			<tr>
				<td style= {{textAlign: "center"}}>{projectID}</td>
				<td> {projectName} </td>
				<td>{(userType === "student" && 				
					<Link to={{
					pathname: "/student/class/project",
					projectID: projectID,
					projectName: projectName
					}}>View Projects</Link>)
					
					|| (userType === "admin" && 				
					<Link to={{
					pathname: "/admin/project",
					projectID: projectID,
					projectName: projectName
					}}>View Projects</Link>)}
				</td>
			</tr>
		);
	}
}

export default Project;
