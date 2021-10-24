import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./header.module.css";
import auth from "../auth";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const renderAdminHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        paddingBottom: "100",
      }}
    >
      <AppBar
        position="static"
        style={{ background: "#adcdf0", padding: "10px" }}
      >
        <Toolbar>
          <Button
            variant="contained"
            sx={{
              marginRight: "400px",
              background: "#90b6e0",
              width: "200%",
            }}
          >
            {/* TODO: shouldn't need margin here, fix later by centering */}
            <NavLink to="/admin-home">View all Classes</NavLink>
          </Button>
          <Button
            variant="contained"
            sx={{ marginRight: "400px", background: "#90b6e0", width: "250%" }}
          >
            <NavLink to="/admin/register">Register a student</NavLink>
          </Button>
          <Button
            variant="contained"
            sx={{ background: "#90b6e0", width: "200%" }}
          >
            <NavLink to="admin/class/create">Create a Subject</NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const renderStudentHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        paddingBottom: "100",
      }}
    >
      <AppBar
        position="static"
        style={{ background: "#adcdf0", padding: "10px" }}
      >
        <Toolbar>
          <Button
            variant="contained"
            sx={{
              marginRight: "400px",
              background: "#90b6e0",
              width: "200%",
            }}
          >
            {/* TODO: shouldn't need margin here, fix later by centering */}
            <NavLink to="/student-home">View your classes</NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const logout = () => {
  auth.logout();
  window.location.reload();
};

const Header = () => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [userType, setUserType] = React.useState("");

  React.useEffect(() => {
    setAuthenticated(auth.isAuthenticated());
    setUserType(auth.getUserType());
  }, []);

  return (
    <div
      id="header"
      style={{
        width: "90vh",
        paddingBottom: "40px",
      }}
    >
      {authenticated && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "5px",
            }}
          >
            <Typography
              sx={{ fontSize: 15, paddingRight: 2 }}
              color="text.primary"
            >
              You are logged in as a {userType}
            </Typography>
            <Button onClick={logout} variant="contained" color="info">
              Logout
            </Button>
          </div>
          {userType === "student" && renderStudentHeader()}
          {userType === "admin" && renderAdminHeader()}
        </>
      )}
    </div>
  );
};

export default Header;
