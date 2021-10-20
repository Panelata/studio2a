import React from 'react';
import auth from './auth';
import './registerStyle.css'

// TODO: style page and display error/confirmation messages

const Register = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [userType, setUserType] = React.useState('');
    const [modal, setModal] = React.useState(false);
    const [shown, setShown] = React.useState(false);

    const register = (ev) =>{
        ev.preventDefault();
        if(userType !== ""){
            auth.register([firstName, lastName, email, username, password, userType], (success, msg) =>{
                if(success){
                    console.log("USER CREATED");
                    setModal(true);
                } else {
                    console.log("ERROR: " + msg);
                    document.getElementById("error").textContent = msg;
                }
            })
        } else {
            console.log("Please select user type");
            document.getElementById("error").textContent = "Please select user type.";
        }
    }

    const toggleModal = () => {
		setModal(!modal);
	}

    const toggleVisiblity = () => {
		var id = document.getElementById("reveal")
		if(shown)
			id.textContent = "Reveal password"
		else
			id.textContent = "Hide password"
		setShown(shown ? false : true);
	}

    return ( 
        <div className='register'>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay">
                        <div className="contents">
                            <h1>User Created!</h1>
                            <p>Click anywhere to close.</p>
                        </div>
                    </div>
                </div>
            )}
            <h2>Register User</h2>
            <form onSubmit={(ev)=>register(ev)}>
                <label>First Name</label>
                <input required type="text" onChange={(ev)=>setFirstName(ev.target.value)} />

                <label>Last Name</label>
                <input required type="text" onChange={(ev)=>setLastName(ev.target.value)} />

                <label>Email</label>
                <input required type="email" onChange={(ev)=>setEmail(ev.target.value)} />

                <label>Username</label>
                <input required type="text" onChange={(ev)=>setUsername(ev.target.value)} />

                <label>Password</label>
                <input required type={shown ? "text" : "password"} onChange={(ev)=>setPassword(ev.target.value)} />

                <div>
                <label>User Type</label>
                </div>
                <div>
                <select onChange={(ev)=>{setUserType(ev.target.value); document.getElementById("error").textContent=""}} >
                    <option hidden>User Type</option>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                </select>
                </div>
                <div class="inner"> <i id="reveal" role="button" onClick={toggleVisiblity} title={shown ? "Hide password" : "Reveal password"}> Reveal password </i> </div>
                <span id="error" className="error"> </span>
                <button type="submit" className="btn btn-primary btn-block btn-large">Register</button>
            </form>
        </div>
    )
}

export default Register;