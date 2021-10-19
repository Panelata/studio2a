import React, { Component } from 'react';
import styles from "./studentHome.module.css"
import { Link } from 'react-router-dom';
import axios from "axios";
import SubjectList from "./SubjectList";


class StudentHome extends Component {

	state = {
		subjects: [],
		url: "http://127.0.0.1:8000/subject/retrieve"
	}
getSubjects = async () => {
		const subjects = await axios.get(this.state.url);
		this.setState({subjects: subjects.data});
	} 

componentDidMount(){
	this.getSubjects();
}
	
render(){
	return (
		<div>
			<h1>student homepage </h1>
			{(this.state.subjects.length > 1 && <SubjectList subjects={this.state.subjects}/>) 
		|| (this.state.subjects.length < 1 && <h4>No subjects currently exist, please contact an admin</h4>)}
		</div>
	)
}
}

export default StudentHome;