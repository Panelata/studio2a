import React, { Component } from 'react';

class Subject extends Component {
	render(){
		const{ id, subjectName } = this.props.subject;

		return(
			<tr>
				<td style= {{textAlign: "center"}}>{id}</td>
				<td> {subjectName} </td>
			</tr>

		);
	}
}


export default Subject;
