import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./header.module.css";
import auth from "../auth";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
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
      <AppBar position="static" style={{ padding: "10px" }}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "100",
          }}
        >
          <Button component={NavLink} to="/admin-home">
            <Typography sx={{ color: "#ffffff" }}>View all Classes</Typography>
          </Button>
          <Button component={NavLink} to="/admin/register">
            <Typography sx={{ color: "#ffffff" }}>
              Register a student
            </Typography>
          </Button>
          <Button component={NavLink} to="/admin/class/create">
            <Typography sx={{ color: "#ffffff" }}>Create a Subject</Typography>
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
        justifyContent: "center",
        alignItems: "flex-start",
        paddingBottom: "100",
      }}
    >
      <AppBar position="static" style={{ padding: "10px" }}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "100",
          }}
        >
          <Button component={NavLink} to="/student-home">
            <Typography sx={{ color: "#ffffff" }}>View your classes</Typography>
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
        // paddingBottom: "40px",
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
