import React, { useEffect, useState } from "react";
import {
    Button,
    CircularProgress,
    Container,
    Divider,
    Grid,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";

import "./Learn.css";
import Header from "../../utils/header/Header";
import Footer from "../../utils/footer/Footer";
import { getLearningData } from "./learnSlice";
import NoData from "../../utils/noData/NoData";
import CourseTile from "../../utils/courseTile/CourseTile";
import Logo from "../../assets/carousalBack.jpg";

const LearnMain = () => {
    let history = useHistory();
    const dispatch = useDispatch();

    // Data from Redux store
    const userId = useSelector((state) => state.profile.userId);
    const isLoading = useSelector((state) => state.learn.isLoading);
    const allCourses = useSelector((state) => state.learn.allCourses);
    const pendingCourses = useSelector((state) => state.learn.pendingCourses);
    const completedCourses = useSelector(
        (state) => state.learn.completedCourses
    );
    const pendingCoursesIds = useSelector(
        (state) => state.learn.pendingCoursesIds
    );
    const completedCoursesIds = useSelector(
        (state) => state.learn.completedCoursesIds
    );

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        dispatch(getLearningData(userId));
    }, [dispatch, userId]);

    return (
        <div>
            <Header headerUrl="learn" />
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
                            {/* Pending Courses carousel */}
                            {pendingCourses.length !== 0 ? (
                                <div>
                                    <div className="pageHeadingWithButton">
                                        <div>Pending Courses</div>
                                        <div
                                            variant="contained"
                                            className="pageHeadingButton"
                                            onClick={() => {
                                                history.push(
                                                    "/learn/pendingCourses"
                                                );
                                            }}
                                        >
                                            View All
                                        </div>
                                    </div>
                                    <Divider style={{ marginBottom: 30 }} />
                                    <Carousel
                                        activeIndex={index}
                                        onSelect={handleSelect}
                                        style={{ marginBottom: 50 }}
                                    >
                                        {pendingCourses.map((course, idx) => {
                                            if (idx < 5) {
                                                return (
                                                    <Carousel.Item key={idx}>
                                                        <img
                                                            className="d-block w-100"
                                                            src={Logo}
                                                            alt="First slide"
                                                            style={{
                                                                height: 350,
                                                                objectFit:
                                                                    "cover",
                                                                width: "100%",
                                                            }}
                                                        />
                                                        <Carousel.Caption>
                                                            <h3>
                                                                {course.title}
                                                            </h3>
                                                            <Button
                                                                size="small"
                                                                variant="contained"
                                                                style={{
                                                                    backgroundColor:
                                                                        "#ffb901",
                                                                    fontWeight:
                                                                        "bold",
                                                                    color: "white",
                                                                    fontFamily:
                                                                        "Quicksand, sans-serif",
                                                                }}
                                                                onClick={() => {
                                                                    history.push(
                                                                        `/course/${course.courseId}`
                                                                    );
                                                                }}
                                                            >
                                                                Go To Course
                                                            </Button>
                                                        </Carousel.Caption>
                                                    </Carousel.Item>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </Carousel>
                                </div>
                            ) : null}

                            {/* All Courses Tiles */}
                            <div className="pageHeadingWithButton">
                                <div>All Courses</div>
                                <div
                                    variant="contained"
                                    className="pageHeadingButton"
                                    onClick={() => {
                                        history.push("/learn/allCourses");
                                    }}
                                >
                                    View All
                                </div>
                            </div>
                            <Divider style={{ marginBottom: 30 }} />
                            {allCourses.length === 0 ? (
                                <NoData fontColor="#00a4ef" />
                            ) : (
                                <Grid
                                    container
                                    spacing={2}
                                    style={{ marginBottom: 50 }}
                                >
                                    {allCourses.map((course, idx) => {
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
                                                            pendingCoursesIds.includes(
                                                                course.courseId
                                                            )
                                                                ? "#ffb901"
                                                                : completedCoursesIds.includes(
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

                            {/* Completed courses tiles */}
                            {completedCourses.length !== 0 ? (
                                <div>
                                    <div className="pageHeadingWithButton">
                                        <div>Completed Courses</div>
                                        <div
                                            variant="contained"
                                            className="pageHeadingButton"
                                            onClick={() => {
                                                history.push(
                                                    "/learn/completedCourses"
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
                                        {completedCourses.map((course, idx) => {
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
                        </div>
                    )}
                </Container>
            </div>
            <Footer headerUrl="learn" />
        </div>
    );
};

export default LearnMain;
