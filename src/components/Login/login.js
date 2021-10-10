import React from 'react';
import auth from '../auth.js';
import './loginStyle.css'


const Login = props => {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [keepSignin, setKeepSignin] = React.useState(false);

	React.useEffect(()=>{
		if(localStorage.getItem('token') !== null){
            fetch('http://127.0.0.1:8000/login/token', {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem('token')
                })
            })
            .then(resp =>{
                return resp.json()
            })
            .then(data =>{
                console.log(data);
                if(data.success){
                    sessionStorage.setItem('token', localStorage.getItem('token'));
                    auth.tokenAuthenticated(data.userType);
					props.checkLogin();
                } else {
                    localStorage.removeItem('token');
                }
            });
        }
	})

	const login = (ev) =>{
		ev.preventDefault();
		auth.login([username, password, keepSignin], (success)=>{
			//If success authenticated redirect user to homepage
			if(success){
				console.log("Success");
				props.checkLogin();
			} else {
				console.log("Unsuccessful");
			}
		});
	}

	return (
		<div className='login'>
			<h1 > Login </h1>
			<form onSubmit={(ev)=>login(ev)}>
				<label>Username</label>
				<input required type="text" onChange={(ev)=>setUsername(ev.target.value)} />
				<label>Password</label>
				<input required type="password" onChange={(ev)=>setPassword(ev.target.value)} />
				<label><input type="checkbox" onChange={()=>setKeepSignin(!keepSignin)} /> Keep me signed in</label>
				<button type="submit" className="btn btn-primary btn-block btn-large">Log In</button>
			</form>
		</div>
	)

	}


export default Login;