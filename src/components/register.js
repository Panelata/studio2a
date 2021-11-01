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
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userType, setUserType] = React.useState("");
  const [message, setMessage] = React.useState("");

  const register = (ev) => {
    ev.preventDefault();
    if (userType !== "") {
      auth.register(
        [firstName, lastName, email, username, password, userType],
        (success, msg) => {
          if (success) {
            console.log("USER CREATED");
            setMessage(`An account for ${firstName} ${lastName} has been created!`);
          } else {
            console.log("ERROR: " + msg);
            setMessage(msg);
          }
        }
      );
    } else {
      setMessage("Please select a user type");
    }
  };

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
                type="password"
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
            <span>{message}</span>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
