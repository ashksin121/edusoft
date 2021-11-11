import React from "react";
import { Container } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";

import "./Teach.css";
import Header from "../../utils/header/Header";

const TeachMain = () => {
    let history = useHistory();

    return (
        <div>
            <Header headerUrl="teach" />
            <Container>
                <div className="teachMainCont">
                    <div
                        className="allCoursesCard"
                        onClick={() => {
                            history.push("/teach/uploadedCourses");
                        }}
                    >
                        <DescriptionIcon
                            style={{ color: "blue", fontSize: 170 }}
                        />
                        <div className="cardTitle">Uploaded Courses</div>
                    </div>
                    <div
                        className="acceptedCoursesCard"
                        onClick={() => {
                            history.push("/teach/acceptedCourses");
                        }}
                    >
                        <CheckCircleIcon
                            style={{ color: "green", fontSize: 170 }}
                        />
                        <div className="cardTitle">Accepted Courses</div>
                    </div>
                    <div
                        className="rejectedCoursesCard"
                        onClick={() => {
                            history.push("/teach/rejectedCourses");
                        }}
                    >
                        <CancelIcon
                            style={{ color: "#9b2505", fontSize: 170 }}
                        />
                        <div className="cardTitle">Rejected Courses</div>
                    </div>
                </div>
            </Container>
            <div className="lowerbarCont">
                <Container
                    style={{ display: "flex", justifyContent: "flex-end" }}
                >
                    <Fab
                        variant="extended"
                        color="primary"
                        aria-label="add"
                        style={{ fontSize: 19, fontWeight: "bold" }}
                        onClick={() => {
                            history.push("/teach/addCourse");
                        }}
                    >
                        <AddIcon sx={{ mr: 1 }} style={{ fontSize: 27 }} />
                        Add Course
                    </Fab>
                </Container>
            </div>
        </div>
    );
};

export default TeachMain;
