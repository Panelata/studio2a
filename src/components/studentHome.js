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
			<SubjectList subjects={this.state.subjects}/>
			{}
		</div>
	)
}
}

export default StudentHome;