//To save time lets just hard code the skills

import React, {Component} from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';
import SkillList from './SkillList';

class studentCompleteSurvey extends Component {

	state = {
		skills: [],
		url: "http://127.0.0.1:8000/survey/skills?projectID=" + String(this.props.location.projectID)
	}
	getSkillsMappings = async () => {
		const skills = await axios.get(this.state.url);
		this.setState({skills: skills.data});
		console.log(skills);
	} 

componentDidMount(){
	this.getSkillsMappings();
}

    render(){
        return (
			<div>
				<h1> Completing Survey for Project: {this.props.location.projectName}</h1>
				<h4>please enter a confidence score from 1-10 next to each skill</h4>
				{(this.state.skills.length > 0 && <SkillList numtoshow={1} skills={this.state.skills}/>)
		|| (this.state.skills.length < 1 && <h4> No Skills available</h4>)}
				<h4>Note: Need to write code to send survey data </h4>
			</div>
        )
    }
 }

 export default studentCompleteSurvey;