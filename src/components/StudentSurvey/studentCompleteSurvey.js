//To save time lets just hard code the skills

import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';
import SkillList from './SkillList';
import Card from "@mui/material/Card";

class studentCompleteSurvey extends Component {

	state = {
		skills: [],
		url: "http://127.0.0.1:8000/survey/skills?projectID=" + String(this.props.location.projectID)
	}
	getSkillsMappings = async () => {
		const skills = await axios.get(this.state.url);
		this.setState({ skills: skills.data });
		console.log(skills);
	}

	componentDidMount() {
		this.getSkillsMappings();
	}

	render() {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					// alignItems: "center",
					height: "100vh",
				}}
			>
				<Card
					sx={{
						width: "90vh",
						height: "100vh",
						paddingTop: 5,
						paddingBottom: 5,
					}}
					className="card"
				>

					<h1 style={{ marginBottom: "20px" }}> Completing Survey for Project: {this.props.location.projectName}</h1>
					<h4 style={{ marginBottom: "20px" }}>Enter a confidence score from 1-10 next to each skill</h4>
					{(this.state.skills.length > 0 && <SkillList numtoshow={1} skills={this.state.skills} />)
						|| (this.state.skills.length < 1 && <h4> No Skills available</h4>)}
					{/* <h4>Note: Need to write code to send survey data </h4> */}
				</Card>
			</div>
		)
	}
}

export default studentCompleteSurvey;