import React from "react";
import { Container } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { useHistory } from "react-router-dom";

import "./Learn.css";
import Header from "../../utils/header/Header";
import Footer from "../../utils/footer/Footer";

const LearnMain = () => {
    let history = useHistory();

    return (
        <div>
            <Header headerUrl="learn" />
            <div className="appContents">
                <Container>
                    <div className="learnMainCont">
                        <div
                            className="allCoursesCard"
                            onClick={() => {
                                history.push("/learn/allCourses");
                            }}
                        >
                            <div className="cardIcon">
                                <DescriptionIcon
                                    style={{ color: "blue", fontSize: 130 }}
                                />
                            </div>
                            <div className="cardTitle">All Courses</div>
                        </div>
                        <div
                            className="pendingCoursesCard"
                            onClick={() => {
                                history.push("/learn/pendingCourses");
                            }}
                        >
                            <div className="cardIcon">
                                <PendingActionsIcon
                                    style={{ color: "#926900", fontSize: 130 }}
                                />
                            </div>
                            <div className="cardTitle">Pending Courses</div>
                        </div>
                        <div
                            className="acceptedCoursesCard"
                            onClick={() => {
                                history.push("/learn/completedCourses");
                            }}
                        >
                            <div className="cardIcon">
                                <CheckCircleIcon
                                    style={{ color: "green", fontSize: 130 }}
                                />
                            </div>
                            <div className="cardTitle">Completed Courses</div>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer headerUrl="learn" />
        </div>
    );
};

export default LearnMain;
