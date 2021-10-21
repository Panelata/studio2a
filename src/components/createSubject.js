import React from 'react';
import auth from './auth';
import './createSubjectStyle.css'

//create New Subject in DB
function createSubjectDB(subjectDetails,cb){
        fetch('http://127.0.0.1:8000/subject/create',{
            method: 'POST',
            body: JSON.stringify({
                subjectName: subjectDetails[0],
            })
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(data.success){
                cb(true);
            } else {
                cb(false, data.message);
            }
        })
    }

const CreateSubject = () => {
    const [subjectName, setSubjectName] = React.useState('');
    
    const createSubject = (ev) =>{
        ev.preventDefault();
        if(subjectName!== ""){
            createSubjectDB([subjectName], (success, msg) =>{
                if(success){
                    console.log("SUBJECT CREATED");
                } else {
                    console.log("ERROR: " + msg);
                }
            })
        } else {
            console.log("Please enter subject name");
        }
 
    }

    return (
        <div className='createSubject'>
            <h2>Create Subject</h2>
            <form onSubmit={(ev)=>createSubject(ev)}>
                <label>Subject Name</label>
                <input required type="text" onChange={(ev)=>setSubjectName(ev.target.value)} />
                <div>
                </div>
                
                <button type="submit" className="btn btn-primary btn-block btn-large">Create Subject</button>
            </form>
        </div>
    )
}

export default CreateSubject;