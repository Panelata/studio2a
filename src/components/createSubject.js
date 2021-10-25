import React from "react";
import "./createSubjectStyle.css";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

//create New Subject in DB
function createSubjectDB(subjectDetails, cb) {
  fetch("http://127.0.0.1:8000/subject/create", {
    method: "POST",
    body: JSON.stringify({
      subjectName: subjectDetails[0],
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        cb(true);
      } else {
        cb(false, data.message);
      }
    });
}

const CreateSubject = () => {
  const [subjectName, setSubjectName] = React.useState("");
  const [message, setMessage] = React.useState("");

  const createSubject = (ev) => {
    ev.preventDefault();
    if (subjectName !== "") {
      createSubjectDB([subjectName], (success, msg) => {
        if (success) {
          console.log("SUBJECT CREATED");
          setMessage(
            `The subject: ${subjectName} has been successfully created!`
          );
        } else {
          console.log("ERROR: " + msg);
          setMessage(msg);
        }
      });
    } else {
      console.log("Please enter subject name");
    }
  };

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
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Create Subject</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                onChange={(ev) => setSubjectName(ev.target.value)}
                label="Subject Name"
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={(ev) => createSubject(ev)} variant="contained">
                Register
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        {message && <label>{message}</label>}
      </Card>
    </div>
  );
};

export default CreateSubject;
