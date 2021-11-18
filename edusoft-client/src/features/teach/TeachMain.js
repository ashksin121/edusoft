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
import Footer from "../../utils/footer/Footer";

const TeachMain = () => {
    let history = useHistory();

    return (
        <div>
            <Header headerUrl="teach" />
            <div className="appContents">
                <Container>
                    <div className="teachMainCont">
                        <div
                            className="allCoursesCard"
                            onClick={() => {
                                history.push("/teach/uploadedCourses");
                            }}
                        >
                            <DescriptionIcon
                                style={{ color: "blue", fontSize: 130 }}
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
                                style={{ color: "green", fontSize: 130 }}
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
                                style={{ color: "#9b2505", fontSize: 130 }}
                            />
                            <div className="cardTitle">Rejected Courses</div>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="lowerbarCont">
                <Container
                    style={{ display: "flex", justifyContent: "flex-end" }}
                >
                    <Fab
                        variant="extended"
                        color="primary"
                        aria-label="add"
                        style={{
                            fontSize: 19,
                            fontWeight: "bold",
                            backgroundColor: "#ffb901",
                            color: "black",
                        }}
                        onClick={() => {
                            history.push("/teach/addCourse");
                        }}
                    >
                        <AddIcon sx={{ mr: 1 }} style={{ fontSize: 27 }} />
                        Add Course
                    </Fab>
                </Container>
            </div>
            <Footer headerUrl="teach" />
        </div>
    );
};

export default TeachMain;
