import React from 'react';
 const AdminProject = (props) => {
    const [projectName, setProjectName] = React.useState('');
    const [size, setSize] = React.useState('');
    const [skills, setSkills] = React.useState([]);
    
    React.useEffect(()=>{
        console.log(props);
    },[]);

    const addSkill = (value) =>{
        setSkills(skills => [...skills, value]);
    }

    const removeSkill = (skill) => {
        console.log('removing ' + skill);
        setSkills(skills.filter(item => item !== skill));
    }

     return (
         <div>
            <p>{props.location.subjectName} > Create Project</p>
            <label>Project Name</label>
            <input type="text" onChange={(ev)=>setProjectName(ev.target.value)} />
            <label>Group Size</label>
            <input type="number" onChange={(ev)=>setSize(ev.target.value)} />
            {
                skills.map((skill, key) => 
                    <div key={key}>
                      <p>{skill}</p>
                      <button onClick={()=>{removeSkill(skill)}}>Remove</button>
                    </div>
                )
            }
            <label>Add Skill</label>
            <select onChange={(ev)=>addSkill(ev.target.value)}>
                    <option hidden>Select Skill</option>
                    <option>Skill 1</option>
                    <option>Skill 2</option>
                    <option>Skill 3</option>
                    <option>Skill 4</option>
            </select> 
         </div>
     )
 }

 export default AdminProject;