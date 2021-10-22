//To save time lets just hard code the skills

import React, {Component} from 'react';
import { useHistory } from 'react-router-dom';
import styles from "./studentProject.module.css"
import axios from "axios";
import { Link } from 'react-router-dom';

class StudentProject extends Component {

    render(){
        return (
            <div>
			<h1>Viewing Project: {this.props.location.projectName}</h1>
			<div className={styles.options}>
				<div className={styles.column}>
					{/* TODO: flip disabled prop for enrolled group once backend is setup (should be disable if a group doesn't exist) */}
					<button className={styles.btn} >View enrolled group</button>
					<button className={styles.btn}>View all groups</button>
				</div>
				<div className={styles.column}>
                <div className={styles.btn}>
                <Link className={styles.link} to={{
					pathname: "/student/class/project/completeSurvey",
                    projectID: this.props.location.projectID,
                    projectName: this.props.location.projectName, 
					}}>Take survey to assign yourself to a group</Link>
                </div>
				</div>
			</div>
		</div>
        )
    }
 }

 export default StudentProject;