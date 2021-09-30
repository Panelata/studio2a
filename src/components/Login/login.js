import React from 'react';
import auth from '../auth.js';
import './loginStyle.css'


const Login = props => {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [shown, setShown] = React.useState(false);

	const login = (ev) =>{
		ev.preventDefault();
		auth.login([username, password], (success)=>{
			//If success authenticated redirect user to homepage
			if(success){
				console.log("Success");
				props.checkLogin();
			} else {
				console.log("Unsuccessful");
				document.getElementById("error").textContent = "Inncorrect username or password."
			}
		});
	}

	const toggleVisiblity = () => {
		var test = document.getElementById("reveal")
		if(shown)
			test.textContent = "Reveal password"
		else
			test.textContent = "Hide password"
		setShown(shown ? false : true);
	}

	return (
		<div className='login'>
			<h1 > Login </h1>
			<form onSubmit={(ev)=>login(ev)}>
				<label>Username</label>
				<input required type="text" onChange={(ev)=>setUsername(ev.target.value)} />
				<label>Password</label>
				<input required type={shown ? "text" : "password"} onChange={(ev)=>setPassword(ev.target.value)} />
				<div class="inner"> <i id="reveal" role="button" onClick={toggleVisiblity} title={shown ? "Hide password" : "Reveal password"}> Reveal password </i> </div>
				<span id="error" className="error"> </span>
				<button type="submit" className="btn btn-primary btn-block btn-large">Log In</button>
			</form>
		</div>
	)

	}


export default Login;