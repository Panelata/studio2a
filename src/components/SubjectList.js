import React, { Component } from 'react';
import Subject from "./Subject"


class SubjectList extends Component {
	render(){
		const subjects = this.props.subjects;
		return (
			<div className="data">
				<table className="ui celled table">
					<thead>
						<tr>
							<th style={{width: "50px", textAlign: "center"}}>#</th>
							<th>Name</th>
							<th style={{width:"148px"}}>Action</th>
						</tr>
					</thead>

					<tbody>
						{subjects.map(subject => {
								return <Subject subject={subject} key={subject.id} />;		
							})}
					</tbody>
				</table>
			</div>
		)
	}
}

export default SubjectList;
