import React, { Component } from 'react';
import Project from "./Project"
import './SubjectListStyle.css'

class ProjectList extends Component {
	render(){
		const surveys = this.props.surveys;
		const subjectName = this.props.subjectName;
		return (
			<div className= "data" >
				<table className="ui celled table" id="subjects">
					<thead>
						<tr>
							<th style={{width: "50px", textAlign: "center"}}>#</th>
							<th>Project Name</th>
							<th style={{width:"148px"}}>View Project</th>
						</tr>
					</thead>

					<tbody>
						{surveys.map(survey => {
								return <Project subjectName={subjectName} survey={survey} key={survey.projectID} />;		
							})}
					</tbody>
				</table>
			</div>
		)
	}
}

export default ProjectList;
