//To save time lets just hard code the skills

import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from "./adminProject.module.css"

 const StudentProject = (props) => {

	state = {
		project: '',
		url: "http://127.0.0.1:8000/survey/retrieve?subjectID" + String(props.location.subjectID)
	}
    
    getProject = async () => {
		const project = await axios.get(this.state.url);
		this.setState({subjects: subjects.data});
	} 



     return (
         <div>

         </div>
     )
 }

 export default StudentProject;