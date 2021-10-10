import React from 'react';
import auth from './auth';

// TODO: style page and display error/confirmation messages

const Register = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [userType, setUserType] = React.useState('');

    const register = (ev) =>{
        ev.preventDefault();
        if(userType !== ""){
            auth.register([firstName, lastName, email, username, password, userType], (success, msg) =>{
                if(success){
                    console.log("USER CREATED");
                } else {
                    console.log("ERROR: " + msg);
                }
            })
        } else {
            console.log("Please select user type");
        }
        
    }

    return (
        <div>
            <h1>Register User</h1>
            <form onSubmit={(ev)=>register(ev)}>
                <label>First Name</label>
                <input required type="text" onChange={(ev)=>setFirstName(ev.target.value)} />

                <label>Last Name</label>
                <input required type="text" onChange={(ev)=>setLastName(ev.target.value)} />

                <label>Email</label>
                <input required type="text" onChange={(ev)=>setEmail(ev.target.value)} />

                <label>Username</label>
                <input required type="text" onChange={(ev)=>setUsername(ev.target.value)} />

                <label>Password</label>
                <input required type="password" onChange={(ev)=>setPassword(ev.target.value)} />

                <label>User Type</label>
                <select onChange={(ev)=>setUserType(ev.target.value)} >
                    <option hidden>User Type</option>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;