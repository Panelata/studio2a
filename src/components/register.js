import React from "react";
import auth from "./auth";
import "./registerStyle.css";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// TODO: style page and display error/confirmation messages

const Register = () => {
<<<<<<< HEAD
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
=======
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userType, setUserType] = React.useState("");

  const register = (ev) => {
    ev.preventDefault();
    if (userType !== "") {
      auth.register(
        [firstName, lastName, email, username, password, userType],
        (success, msg) => {
          if (success) {
            console.log("USER CREATED");
          } else {
            console.log("ERROR: " + msg);
          }
        }
      );
    } else {
      console.log("Please select user type");
>>>>>>> develop
    }
  };

<<<<<<< HEAD
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
=======
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          width: "90vh",
          height: "100vh",
          paddingTop: 5,
          paddingBottom: 5,
        }}
        className="card"
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Register User</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                onChange={(ev) => setFirstName(ev.target.value)}
                label="First Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                onChange={(ev) => setLastName(ev.target.value)}
                label="Last Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                onChange={(ev) => setEmail(ev.target.value)}
                label="Email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                onChange={(ev) => setUsername(ev.target.value)}
                label="Username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                onChange={(ev) => setPassword(ev.target.value)}
                label="Password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ minWidth: "120px" }}>
                <InputLabel id="user-type-select-label">User Type</InputLabel>
                <Select
                  labelId="user-type-select-label"
                  id="user-type-select"
                  value={userType}
                  label="User Type"
                  onChange={(ev) => setUserType(ev.target.value)}
                >
                  <MenuItem value={"student"}>Student</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={(ev) => register(ev)} variant="contained">
                Register
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
>>>>>>> develop
