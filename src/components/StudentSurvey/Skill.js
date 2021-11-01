import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../auth';
import axios from 'axios';

class Skill extends Component {

	constructor(props) {
		super(props);
		this.state = {value: 0};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	};
	  
	handleChange(event) {
		this.setState({value: event.target.value});
	  }

	handleSubmit(event) {
		console.log(this.props.skill.mappingID)
		console.log(this.state.value)
		console.log(auth.getUserID())
		console.log(auth.userType)

		fetch('http://127.0.0.1:8000/skillLevel', {
            method: 'POST', 
            body: JSON.stringify({
                mappingID: this.props.skill.mappingID,
                score: this.state.value,
                userID: auth.getUserID(),
            })
        })
        .then(response => {
            return response.json();
        })
        .then(data =>{
            if(data.success){
                console.log("Successfully created new skill Level...Redirecting");
            }
        });

		alert('A score of ' + this.state.value + ' was submitted');
		event.preventDefault();

	  }

	render(){
	const{mappingID, skills} = this.props.skill;
	const userType = auth.getUserType();

		return(
			<tr>
				<td> {skills} </td>
				<td>{(userType === "student" &&

				<div>
      			<form onSubmit={this.handleSubmit}>
        			<label>
          			<input type="number" value={this.state.value} onChange={this.handleChange} />
        			</label>
					<input type="submit" value="Submit" />
      			</form>
				</div>

					)
					|| (userType === "admin" && 				
					<h4>code needed to make survey editable</h4>)}
				</td>
			</tr>
		);
	}
}

export default Skill;
