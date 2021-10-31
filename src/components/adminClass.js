import React from "react";
import styles from "./adminClass.module.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";

const AdminClass = (props) => {
  const { subjectName } = props.location;
  // console.log(props.location.subjectID);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
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
        <div>
          <h2>Welcome To {subjectName}</h2>
          <br></br>
          <br></br>
        </div>

        <div className={styles.boxcontainer}>
          <div className={styles.box1}>
            {" "}
            <Link
              to={{
                pathname: "/admin/class/create-project",
                subjectName: subjectName,
                subjectID: props.location.subjectID,
              }}
            >
              Create a new Project
            </Link>
          </div>
          <div className={styles.box2}>
            <Link
              to={{
                pathname: "/admin/class/projects",
                subjectName: subjectName,
                subjectID: props.location.subjectID,
              }}
            >
              Manage Projects
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminClass;
