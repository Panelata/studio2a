import React, { useState } from 'react';
import axios from "axios";
import FormatGroupResponse from '../Utils/FormatGroupResponse';
const StudentShowGroups = (props) => {
    const [groups, setGroups] = useState([]);

    console.log(props);
    const getGroups = async () => {
        try {
            // let { data } = await axios.get(`http://127.0.0.1:8000/groups/retrieve?projectID=${projectID}`);
            let { data } = await axios.get(`http://127.0.0.1:8000/groups/retrieve?projectID=` + props.projectID);
            let formattedGroups = FormatGroupResponse(data);
            setGroups(formattedGroups);
        } catch (error) {
            console.log("Error in getGroups");
            console.error(error);
        }
    };

    //Called on initial mount
    React.useEffect(() => {
        console.log('hgere');
        console.log(props.projectID);
        getGroups();
    }, []);

    return (
        <div className="groups" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>{
            groups.map((group, i) =>
                <div
                    style={{ border: "1px solid black", display: "flex", flexDirection: "column", margin: "30px", padding: "20px", width: "600px", alignItems: "center" }}
                    key={i}>
                    <div style={{ textDecoration: "underline", fontWeight: "bold" }}>Group {i + 1}</div>
                    {group.map((student, index) =>
                        <div key={index} style={{ display: "flex", flexDirection: "row" }}>
                            <div>{student.firstName} {student.lastName}</div>
                        </div>
                    )}
                </div>
            )
        }
        </div>
    )
}

export default StudentShowGroups;