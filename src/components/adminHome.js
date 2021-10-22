import React, { Component } from 'react';
import styles from "./adminHome.module.css";
import axios from "axios";
import SubjectList from "./SubjectList";


class AdminHome extends Component {

	state = {
		subjects: [],
		url: "http://127.0.0.1:8000/subject/retrieve"
	}
	getSubjects = async () => {
		const subjects = await axios.get(this.state.url);
		this.setState({ subjects: subjects.data });
	}

	componentDidMount() {
		this.getSubjects();
	}

	render() {
		return (
			<div>
				<div>
					<h1> Admin Homepage </h1>
				</div>
				<button type="button" className={styles.theButton}>Notifications </button>

				{(this.state.subjects.length > 0 && <SubjectList subjects={this.state.subjects} />)
					|| (this.state.subjects.length < 1 && <h4>No subjects currently exist, you can create subjects via the "Create a subject" page</h4>)}
			</div>
		)
	}

}


export default AdminHome;
