//To save time lets just hard code the skills

import React, {Component} from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import ProjectList from './ProjectList';


class StudentClass extends Component {

    state = {
		surveys: [],
		url: "http://127.0.0.1:8000/survey/retrieve?subjectID=" + String(this.props.location.subjectID)
	}
    
    getSurveys = async () => {
		const surveys = await axios.get(this.state.url);
		this.setState({surveys: surveys.data});
	} 

    componentDidMount(){
        this.getSurveys();
    }

    render(){
        return (
            <div>
                <h1> {this.props.location.subjectName} > View Projects </h1>
				{(this.state.surveys.length > 0 && <ProjectList surveys={this.state.surveys}/>)
		|| (this.state.surveys.length < 1 && <h4> No Projects Available</h4>)}
            </div>
        )
    }
 }

 export default StudentClass;