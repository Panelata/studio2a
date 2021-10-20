import React from 'react';
import auth from '../auth.js';
// import './loginStyle.css'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';


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
	const [shown, setShown] = React.useState(false);

	const login = (ev) =>{
		ev.preventDefault();
		auth.login([username, password, keepSignin], (success)=>{
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
		setShown(shown ? false : true);
	}

	return (
		<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '80vh'}}>
			<Card sx={{ minWidth: 275, maxWidth: 300 }}>
				<CardContent>
					<Grid container spacing={2} justifyContent="center">
						<form onSubmit={(ev)=>login(ev)}>
							<Grid item xs={12}>
								<Typography sx={{ fontSize: 34 }} color="text.primary" gutterBottom>
									Login
								</Typography>
							</Grid>
						
							{/* <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
								Username
							</Typography> */}
							<Grid item xs={12}>
								<TextField sx={{ minWidth: 250 }} id="outlined-basic" label="Username" variant="outlined" helper="Username" required type="text" onChange={(ev)=>setUsername(ev.target.value)}/>
							</Grid>
							<Grid item xs={12}>
								<FormControl sx={{ m: 1, width: '250' }} variant="outlined">
									<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
									<OutlinedInput
										sx={{ minWidth: 250 }}
										id="outlined-adornment-password"
										type={shown ? "text" : "password"}
										onChange={(ev)=>setPassword(ev.target.value)}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={toggleVisiblity}
													// onMouseDown={handleMouseDownPassword}
													edge="end"
												>
													{shown ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										}
										label="Password"
									/>
								</FormControl>
							</Grid>
							<Grid item container xs={12} alignItems="center">
								<Grid item xs={4}>
									<Checkbox onChange={()=>setKeepSignin(!keepSignin)} />
								</Grid>
								<Grid item xs={8}>
									<Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
										Keep me signed in
									</Typography>
								</Grid>
							</Grid>
							<span id="error" className="error"> </span>	
							<Grid item xs={12}>
								<Button sx={{ minWidth: 250 }} type="submit" variant="contained" >Log In</Button>
							</Grid>
						</form>
					</Grid>
				</CardContent>
			</Card>
		</div>
	)
}

export default Login;