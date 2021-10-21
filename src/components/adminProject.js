//To save time lets just hard code the skills

import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import DeleteIcon from '@mui/icons-material/Delete';

 const AdminProject = (props) => {
    const history = useHistory();
    const [projectName, setProjectName] = React.useState('');
    const [size, setSize] = React.useState('');
    const [skills, setSkills] = React.useState([]);
    const [skillOptions, setSkillOptions] = React.useState([
        'Skill 1',
        'Skill 2',
        'Skill 3',
        'Skill 4'
    ]);
    
    React.useEffect(()=>{
        console.log(props);
    },[]);

    const addSkill = (value) =>{
        setSkills([...skills, value]);
        setSkillOptions(skillOptions.filter(item => item !== value)) // remove skill from available options to avoid duplicates
    }

    const removeSkill = (skill) => {
        setSkills(skills.filter(item => item !== skill));
        setSkillOptions([...skillOptions, skill].sort()) // add skill back to available options
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
                skills: skills
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
        <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center', height: '95vh'}}>
            <Card sx={{ width: 700, paddingTop: 5, paddingBottom: 5 }}>
                <CardContent>
                    <Grid container direction="column" spacing={0} justifyContent="center">
                        <form onSubmit={(ev)=>{}}>
                            <Grid item xs={12}>
                                <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
                                    Software Engineering Studio 1a {'>'} Create Project
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField sx={{ minWidth: 250 }} id="outlined-basic" label="Project Name" variant="outlined" helper="Project Name" required type="text" onChange={(ev)=>setProjectName(ev.target.value)}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField sx={{ minWidth: 250 }} id="outlined-basic" label="Group Size" variant="outlined" helper="Group Size" required type="text" onChange={(ev)=>setSize(ev.target.value)}/>
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    skills.map((skill, key) => 
                                        <div key={key} style={{display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                                            <Typography component="h3">{skill}</Typography>
                                            <IconButton aria-label="delete" onClick={()=>{removeSkill(skill)}}>
                                                <DeleteIcon />
                                            </IconButton>
                                        {/* <Button variant="outlined" onClick={()=>{removeSkill(skill)}} endIcon={<DeleteIcon />} color="error">Remove</Button> */}
                                        </div>
                                    )
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl sx={{ minWidth: 250 }}>
                                    <InputLabel id="project-select-label">Add Skill</InputLabel>
                                    <Select
                                        labelId="project-select-label"
                                        id="project-select"
                                        value={'test'}
                                        label="Select Skill"
                                        onChange={(ev)=>addSkill(ev.target.value)}
                                    >
                                        {
                                            skillOptions.map(skill =>
                                                <MenuItem value={skill}>{skill}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button sx={{ minWidth: 250 }} type="submit" variant="contained" onClick={uploadSurvey} >Upload Survey</Button>
                            </Grid>
                        </form>
                    </Grid>
                </CardContent>
            </Card>
        </div>
     )
 }

 export default AdminProject;