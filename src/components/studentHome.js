import React, { Component } from "react";
import styles from "./studentHome.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import SubjectList from "./SubjectList";
import Card from "@mui/material/Card";

class StudentHome extends Component {
  state = {
    subjects: [],
    url: "http://127.0.0.1:8000/subject/retrieve",
  };
  getSubjects = async () => {
    const subjects = await axios.get(this.state.url);
    this.setState({ subjects: subjects.data });
  };

  componentDidMount() {
    this.getSubjects();
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
        >
          <h1>Student Homepage </h1>
          {(this.state.subjects.length > 0 && (
            <SubjectList subjects={this.state.subjects} />
          )) ||
            (this.state.subjects.length < 1 && (
              <h4>No subjects currently exist, please contact an admin</h4>
            ))}
        </Card>
      </div>
    );
  }
}

export default StudentHome;
