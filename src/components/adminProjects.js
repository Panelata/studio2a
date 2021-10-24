//To save time lets just hard code the skills

import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import ProjectList from './ProjectList';
import { Link } from "react-router-dom";

class AdminProjects extends Component {

    state = {
        surveys: [],
        url: "http://127.0.0.1:8000/survey/retrieve?subjectID=" + String(this.props.location.subjectID)
    }

    getSurveys = async () => {
        const surveys = await axios.get(this.state.url);
        this.setState({ surveys: surveys.data });
    }

    componentDidMount() {
        this.getSurveys();
    }

    render() {
        return (
            <div>
                <h2 style={{ marginBottom: "30px" }}> {this.props.location.subjectName} > All Projects </h2>
                {(this.state.surveys.length > 0 && <ProjectList subjectName={this.props.location.subjectName} surveys={this.state.surveys} />)
                    || (this.state.surveys.length < 1 &&
                        <>
                            <h4 style={{ margin: "30px" }}> No Projects Available</h4>
                            <div style={{ lineHeight: "40px" }}>
                                Want to create one?<br />
                                <Link to={{
                                    pathname: "/admin/class/create-project",
                                    subjectName: this.props.location.subjectName,
                                    subjectID: this.props.location.subjectID
                                }}>Create one here!</Link>
                            </div>
                        </>
                    )}
            </div>
        )
    }
}

export default AdminProjects;