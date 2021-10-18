import React from 'react';
 const AdminProject = (props) => {
    const [projectName, setProjectName] = React.useState('');
    const [size, setSize] = React.useState('');
    
    React.useEffect(()=>{
        console.log(props);
    },[]);


     return (
         <div>
            <p>{props.location.subjectName} > Create Project</p>
            <label>Project Name</label>
            <input type="text" onChange={(ev)=>setProjectName(ev.target.value)} />
            <label>Group Size</label>
            <input type="number" onChange={(ev)=>setSize(ev.target.value)} />
         </div>
     )
 }

 export default AdminProject;