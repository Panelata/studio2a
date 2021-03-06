//To save time lets just hard code the skills

import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./adminProject.module.css";
import Card from "@mui/material/Card";

const AdminProject = (props) => {
  const history = useHistory();
  const [projectName, setProjectName] = React.useState('');
  const [size, setSize] = React.useState('');
  const [skills, setSkills] = React.useState([]);
  const [skillInput, setSkillInput] = React.useState('');

  React.useEffect(() => {
    console.log(props);
  }, []);

  React.useEffect(() => {
    console.log(props);
  }, []);

  const addSkill = (value) => {
    setSkills((skills) => [...skills, value]);
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((item) => item !== skill));
  };

  const uploadSurvey = () => {
    console.log(skills);
    console.log(projectName);
    console.log(size);

    fetch('http://127.0.0.1:8000/survey', {
      method: 'POST',
      body: JSON.stringify({
        projectName: projectName,
        size: size,
        skills: skills,
        subjectID: props.location.subjectID

      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.success) {
          console.log("Successfully created new project...Redirecting");
          history.push("/");
        }
      });
  }

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
          height: "",
          paddingTop: 5,
          paddingBottom: 5,
        }}
        className="card"
      >
        <div>
          <p className={styles.PageHeader}>{props.location.subjectName} > Create Project</p>
          <label>Project Name</label>
          <br />
          <input className={styles.input} type="text" onChange={(ev) => setProjectName(ev.target.value)} />
          <br />
          <br />
          <label>Group Size</label>
          <br />
          <input className={styles.input} type="number" onChange={(ev) => setSize(ev.target.value)} />
          {
            skills.map((skill, key) =>
              <div key={key}>
                <p>{skill}</p>
                <button className={styles.smallButton} onClick={() => { removeSkill(skill) }}>Remove</button>
              </div>
            )
          }
          <br />
          <label>Add Skill</label>
          <br />
          <input className={styles.input} type="text" onChange={event => setSkillInput(event.target.value)} />
          <br />
          <button className={styles.smallButton} onClick={(ev) => addSkill(skillInput)}>Add Skill</button>
          <br />
          <button className={styles.uploadButton} onClick={uploadSurvey}>Upload Survey</button>
        </div>
      </Card>
    </div>
  );
};

export default AdminProject;

