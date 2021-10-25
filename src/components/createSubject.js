import React from "react";
import "./createSubjectStyle.css";
import Card from "@mui/material/Card";

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
        <h2 style={{ margin: "30px" }}>Create Subject</h2>
        <form
          style={{ marginBottom: "20px" }}
          onSubmit={(ev) => createSubject(ev)}
        >
          <label>Subject Name</label>
          <input
            required
            type="text"
            onChange={(ev) => setSubjectName(ev.target.value)}
          />
          <div></div>
          <button type="submit" className="btn btn-primary btn-block btn-large">
            Create Subject
          </button>
        </form>
        {message && <label>{message}</label>}
      </Card>
    </div>
  );
};

export default CreateSubject;
