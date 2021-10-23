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

	render() {
		const { subjectName } = this.props;
		const { projectID, projectName } = this.props.survey;
		const userType = auth.getUserType();

		return (
			<tr>
				<td style={{ textAlign: "center" }}>{projectID}</td>
				<td> {projectName} </td>
				<td>{(userType === "student" &&
					<Link to={{
						pathname: "/student/class/project",
						projectID: projectID,
						projectName: projectName
					}}>View Project</Link>)

					|| (userType === "admin" &&
						<Link to={{
							pathname: "/admin/class/manage-project",
							projectID: projectID,
							projectName: projectName,
							subjectName: subjectName
						}}>Manage Project</Link>)}
				</td>
			</tr>
		);
	}
}

export default Project;
