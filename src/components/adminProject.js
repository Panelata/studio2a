//To save time lets just hard code the skills

import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from "./adminProject.module.css"

 const AdminProject = (props) => {
    const history = useHistory();
    const [projectName, setProjectName] = React.useState('');
    const [size, setSize] = React.useState('');
    const [skills, setSkills] = React.useState([]);
    const [subjectID, setSubjectID] = React.useState('');

    React.useEffect(()=>{
        console.log(props);
    },[]);

    const addSkill = (value) =>{
        setSkills(skills => [...skills, value]);
    }

    const removeSkill = (skill) => {
        setSkills(skills.filter(item => item !== skill));
    }

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
                subjectID: subjectID

            })
        })
        .then(response => {
            return response.json();
        })
        .then(data =>{
            if(data.success){
                console.log("Successfully created new project...Redirecting");
                history.push("/");
            }
        });
    }

     return (
         <div>
            <p className={styles.PageHeader}>{props.location.subjectName} > Create Project</p>
            <label>Project Name</label>
            <br/>
            <input className={styles.input} type="text" onChange={(ev)=>setProjectName(ev.target.value)} />
            <br/>
            <label>SubjectID</label>
            <br/>
            <input className={styles.input} type="number" value={props.location.subjectID} onChange={(ev)=>setSubjectID(ev.target.value)} />
            <br/>
            <label>Group Size</label>
            <br/>
            <input className={styles.input} type="number" onChange={(ev)=>setSize(ev.target.value)} />
            {
                skills.map((skill, key) => 
                    <div key={key}>
                      <p>{skill}</p>
                      <button className={styles.removeButton} onClick={()=>{removeSkill(skill)}}>Remove</button>
                    </div>
                )
            }
            <br/>
            <label>Add Skill</label>
            <br/>
            <select className={styles.selectSkillMenu} onChange={(ev)=>addSkill(ev.target.value)}>
                    <option hidden>Select Skill</option>
                    <option>Skill 1</option>
                    <option>Skill 2</option>
                    <option>Skill 3</option>
                    <option>Skill 4</option>
            </select> 
            <br/>
            <button className={styles.uploadButton} onClick={uploadSurvey}>Upload Survey</button>
         </div>
     )
 }

 export default AdminProject;