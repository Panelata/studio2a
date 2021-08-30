import React from 'react';
import auth from './auth';

const Login = () => {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	const login = (ev) =>{
		ev.preventDefault();
		auth.login([username, password], (success)=>{
			//If success authenticated redirect user to homepage
			if(success){
				console.log("Success");
			} else {
				console.log("Unsuccessful");
			}
		});
	}

	return (
		<div>
			<h1> I'm the login page </h1>
			<form onSubmit={(ev)=>login(ev)}>
				<label>Username</label>
				<input required type="text" onChange={(ev)=>setUsername(ev.target.value)} />
				<label>Password</label>
				<input required type="password" onChange={(ev)=>setPassword(ev.target.value)} />
				<button type="submit">Log In</button>
			</form>
		</div>
	)
}

export default Login;