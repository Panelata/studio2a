import React, { Component } from 'react';
import Subject from "./Subject"
import './SubjectListStyle.css'

class SubjectList extends Component {
	render(){
		const subjects = this.props.subjects;
		return (
			<div style={{marginBottom:"30px"}} className= "data" >
				<table className="ui celled table" id="subjects">
					<thead>
						<tr>
							<th style={{width: "50px", textAlign: "center"}}>#</th>
							<th>Subject Name</th>
							<th style={{width:"148px"}}>Action</th>
						</tr>
					</thead>

					<tbody>
						{subjects.map(subject => {
								return <Subject subject={subject} key={subject.subjectID} />;		
							})}
					</tbody>
				</table>
			</div>
		)
	}
}

export default SubjectList;
