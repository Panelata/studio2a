import React, { Component } from 'react';
import styles from "./adminHome.module.css"
import { Link } from 'react-router-dom';
import axios from "axios";
import SubjectList from "./SubjectList";


class AdminHome extends Component {

	state = {
		subjects: [],
		url: "http://127.0.0.1:8000/subject/retrievesadsadasdas"
	}
	getSubjects = async () => {
		let subjects
		try {
			let {data} = await axios.get(this.state.url);
			subjects = data; 
		} catch {
			subjects = [
				{ subjectID: 1, subjectName: 'SES1a' },
				{ subjectID: 2, subjectName: 'SES1b' },
				{ subjectID: 3, subjectName: 'Data Structures' },
				{ subjectID: 4, subjectName: 'Programming 1' }]
		}

		this.setState({ subjects });
	}

	componentDidMount() {
		this.getSubjects();
	}


	render() {
		return (
			<div>
				<div>
					<h1> This is the admin Homepage </h1>
				</div>
				<button type="button" className={styles.theButton}>Notifications </button>

				{(this.state.subjects.length > 0 && <SubjectList subjects={this.state.subjects} />)
					|| (this.state.subjects.length < 1 && <h4>No subjects currently exist, you can create subjects via the "Create a subject" page</h4>)}
			</div>
		)
	}

}


export default AdminHome;
