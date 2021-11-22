import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Container, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import "./Profile.css";
import Header from "../../utils/header/Header";
import { logIn, logOut } from "./profileSlice";
import { getLearningData } from "../learn/learnSlice";
import { getTeachingData } from "../teach/teachSlice";
import Footer from "../../utils/footer/Footer";

const Profile = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // Data from redx store
    const userId = useSelector((state) => state.profile.userId);
    const name = useSelector((state) => state.profile.name);
    const coins = useSelector((state) => state.profile.coins);
    const profileLoading = useSelector((state) => state.profile.isLoading);
    const learnLoading = useSelector((state) => state.learn.isLoading);
    const teachLoading = useSelector((state) => state.teach.isLoading);
    const pendingCoursesIds = useSelector(
        (state) => state.learn.pendingCoursesIds
    );
    const completedCoursesIds = useSelector(
        (state) => state.learn.completedCoursesIds
    );
    const uploadedCourses = useSelector((state) => state.teach.uploadedCourses);
    const acceptedCourses = useSelector((state) => state.teach.acceptedCourses);
    const rejectedCourses = useSelector((state) => state.teach.rejectedCourses);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(logIn(userId));
        dispatch(getLearningData(userId));
        dispatch(getTeachingData);
        setIsLoading(false);
    }, [dispatch, userId]);

    // Allows user to logout
    const handleLogout = async () => {
        try {
            await dispatch(logOut());
            history.push("/");
        } catch (err) {}
    };

    return (
        <div className="appBody">
            <Header headerUrl="none" />
            {isLoading || learnLoading || teachLoading || profileLoading ? (
                <div
                    style={{
                        width: "100%",
                        marginTop: 50,
                        textAlign: "center",
                    }}
                >
                    <CircularProgress />
                </div>
            ) : (
                <div className="appContents">
                    <Container style={{ marginTop: 50 }}>
                        <div className="pageHeading">{name}</div>
                        <Divider style={{ marginBottom: 30 }} />
                        <div className="profileCoinsCont">
                            <div className="profileCoinsTitle">
                                Coins Earned
                            </div>
                            <div className="profileCoinsValue">
                                {coins} <MonetizationOnIcon />
                            </div>
                        </div>

                        <div className="pageSubHeading">
                            Learner Achievement
                        </div>
                        <Divider style={{ marginBottom: 30 }} />
                        <div
                            className="profileDataCont"
                            style={{ color: "#7fba00" }}
                        >
                            <div className="profileDataHeading">
                                Courses Completed
                            </div>
                            <div className="profileDataValue">
                                {completedCoursesIds.length}
                            </div>
                        </div>
                        <div
                            className="profileDataCont"
                            style={{ color: "#ffb901" }}
                        >
                            <div className="profileDataHeading">
                                Courses Pending
                            </div>
                            <div className="profileDataValue">
                                {pendingCoursesIds.length}
                            </div>
                        </div>

                        <div className="pageSubHeading">
                            Teacher Achievement
                        </div>
                        <Divider style={{ marginBottom: 30 }} />
                        <div
                            className="profileDataCont"
                            style={{ color: "#00a4ef" }}
                        >
                            <div className="profileDataHeading">
                                Courses Uploaded
                            </div>
                            <div className="profileDataValue">
                                {uploadedCourses.length}
                            </div>
                        </div>
                        <div
                            className="profileDataCont"
                            style={{ color: "#7fba00" }}
                        >
                            <div className="profileDataHeading">
                                Courses Accepted
                            </div>
                            <div className="profileDataValue">
                                {acceptedCourses.length}
                            </div>
                        </div>
                        <div
                            className="profileDataCont"
                            style={{ color: "#f25022" }}
                        >
                            <div className="profileDataHeading">
                                Courses Rejected
                            </div>
                            <div className="profileDataValue">
                                {rejectedCourses.length}
                            </div>
                        </div>

                        {/* Logout button */}
                        <div className="profileButtonCont">
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: "#f25022",
                                    borderRadius: 25,
                                    fontFamily: "Quicksand, sans-serif",
                                    fontWeight: "bold",
                                }}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    </Container>
                </div>
            )}
            <Footer headerUrl="profile" />
        </div>
    );
};

export default Profile;
