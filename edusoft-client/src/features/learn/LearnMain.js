import React from "react";
import { Container } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { useHistory } from "react-router-dom";

import "./Learn.css";
import Header from "../../utils/header/Header";

const LearnMain = () => {
    let history = useHistory();

    return (
        <div>
            <Header headerUrl="learn" />
            <Container>
                <div className="learnMainCont">
                    <div
                        className="allCoursesCard"
                        onClick={() => {
                            history.push("/learn/allCourses");
                        }}
                    >
                        <DescriptionIcon
                            style={{ color: "blue", fontSize: 170 }}
                        />
                        <div className="cardTitle">All Courses</div>
                    </div>
                    <div
                        className="pendingCoursesCard"
                        onClick={() => {
                            history.push("/learn/pendingCourses");
                        }}
                    >
                        <PendingActionsIcon
                            style={{ color: "#926900", fontSize: 170 }}
                        />
                        <div className="cardTitle">Pending Courses</div>
                    </div>
                    <div
                        className="acceptedCoursesCard"
                        onClick={() => {
                            history.push("/learn/completedCourses");
                        }}
                    >
                        <CheckCircleIcon
                            style={{ color: "green", fontSize: 170 }}
                        />
                        <div className="cardTitle">Completed Courses</div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default LearnMain;
