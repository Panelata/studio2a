import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../auth';

class Skill extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  count: 0
		};
	  }

	render(){
	const{mappingID, skills} = this.props.skill;
	const userType = auth.getUserType();

		return(
			<tr>
				<td style= {{textAlign: "center"}}>{mappingID}</td>
				<td> {skills} </td>
				<td>{(userType === "student" && 				
					<input></input>)
					
					|| (userType === "admin" && 				
					<Link to={{
					pathname: "/admin/project",
					}}>View Projects</Link>)}
				</td>
			</tr>
		);
	}
}

export default Skill;
