import React, { useEffect } from "react";
import { CircularProgress, Container, Divider, Grid } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Teach.css";
import Header from "../../utils/header/Header";
import Footer from "../../utils/footer/Footer";
import { getTeachingData } from "./teachSlice";
import NoData from "../../utils/noData/NoData";
import CourseTile from "../../utils/courseTile/CourseTile";

const TeachMain = () => {
    let history = useHistory();
    const dispatch = useDispatch();

    // Data from redux store
    const userId = useSelector((state) => state.profile.userId);
    const isLoading = useSelector((state) => state.teach.isLoading);
    const uploadedCourses = useSelector((state) => state.teach.uploadedCourses);
    const acceptedCourses = useSelector((state) => state.teach.acceptedCourses);
    const rejectedCourses = useSelector((state) => state.teach.rejectedCourses);
    const acceptedCourseIds = useSelector(
        (state) => state.teach.acceptedCourseIds
    );
    const rejectedCourseIds = useSelector(
        (state) => state.teach.rejectedCourseIds
    );

    useEffect(() => {
        dispatch(getTeachingData(userId));
    }, [dispatch, userId]);

    return (
        <div>
            <Header headerUrl="teach" />
            <div className="appContents">
                <Container style={{ paddingTop: 50 }}>
                    {isLoading ? (
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <CircularProgress style={{ color: "#00a4ef" }} />
                        </div>
                    ) : (
                        <div>
                            {/* Uploaded Courses tiles */}
                            <div className="pageHeadingWithButton">
                                <div>Uploaded Courses</div>
                                <div
                                    variant="contained"
                                    className="pageHeadingButton"
                                    onClick={() => {
                                        history.push("/teach/uploadedCourses");
                                    }}
                                >
                                    View All
                                </div>
                            </div>
                            <Divider style={{ marginBottom: 30 }} />
                            {uploadedCourses.length === 0 ? (
                                <NoData fontColor="#00a4ef" />
                            ) : (
                                <Grid
                                    container
                                    spacing={2}
                                    style={{ marginBottom: 50 }}
                                >
                                    {uploadedCourses.map((course, idx) => {
                                        if (idx < 4) {
                                            return (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={6}
                                                    md={3}
                                                    key={idx}
                                                >
                                                    <CourseTile
                                                        courseName={
                                                            course.title
                                                        }
                                                        courseTags={
                                                            course.tagArray
                                                        }
                                                        courseId={
                                                            course.courseId
                                                        }
                                                        bgColor={
                                                            rejectedCourseIds.includes(
                                                                course.courseId
                                                            )
                                                                ? "#f25022"
                                                                : acceptedCourseIds.includes(
                                                                      course.courseId
                                                                  )
                                                                ? "#7fba00"
                                                                : "#00a4ef"
                                                        }
                                                    />
                                                </Grid>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                </Grid>
                            )}

                            {/* Accepted Courses tile */}
                            {acceptedCourses.length !== 0 ? (
                                <div>
                                    <div className="pageHeadingWithButton">
                                        <div>Accepted Courses</div>
                                        <div
                                            variant="contained"
                                            className="pageHeadingButton"
                                            onClick={() => {
                                                history.push(
                                                    "/teach/acceptedCourses"
                                                );
                                            }}
                                        >
                                            View All
                                        </div>
                                    </div>
                                    <Divider style={{ marginBottom: 30 }} />
                                    <Grid
                                        container
                                        spacing={2}
                                        style={{ marginBottom: 50 }}
                                    >
                                        {acceptedCourses.map((course, idx) => {
                                            if (idx < 4) {
                                                return (
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sm={6}
                                                        md={3}
                                                        key={idx}
                                                    >
                                                        <CourseTile
                                                            courseName={
                                                                course.title
                                                            }
                                                            courseTags={
                                                                course.tagArray
                                                            }
                                                            courseId={
                                                                course.courseId
                                                            }
                                                            bgColor="#7fba00"
                                                        />
                                                    </Grid>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </Grid>
                                </div>
                            ) : null}

                            {/* Rejected Courses tile */}
                            {rejectedCourses.length !== 0 ? (
                                <div>
                                    <div className="pageHeadingWithButton">
                                        <div>Rejected Courses</div>
                                        <div
                                            variant="contained"
                                            className="pageHeadingButton"
                                            onClick={() => {
                                                history.push(
                                                    "/teach/rejectedCourses"
                                                );
                                            }}
                                        >
                                            View All
                                        </div>
                                    </div>
                                    <Divider style={{ marginBottom: 30 }} />
                                    <Grid
                                        container
                                        spacing={2}
                                        style={{ marginBottom: 50 }}
                                    >
                                        {rejectedCourses.map((course, idx) => {
                                            if (idx < 4) {
                                                return (
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sm={6}
                                                        md={3}
                                                        key={idx}
                                                    >
                                                        <CourseTile
                                                            courseName={
                                                                course.title
                                                            }
                                                            courseTags={
                                                                course.tagArray
                                                            }
                                                            courseId={
                                                                course.courseId
                                                            }
                                                            bgColor="#f25022"
                                                        />
                                                    </Grid>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </Grid>
                                </div>
                            ) : null}
                        </div>
                    )}
                </Container>
            </div>

            {/* Add Course button */}
            <Fab
                variant="extended"
                color="primary"
                aria-label="add"
                style={{
                    fontSize: 19,
                    fontWeight: "bold",
                    backgroundColor: "#ffb901",
                    color: "black",
                    position: "fixed",
                    right: 20,
                }}
                className="lowerBtn"
                onClick={() => {
                    history.push("/teach/addCourse");
                }}
            >
                <AddIcon sx={{ mr: 1 }} style={{ fontSize: 27 }} />
                Add Course
            </Fab>
            <Footer headerUrl="teach" />
        </div>
    );
};

export default TeachMain;
