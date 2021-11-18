import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Divider, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";

import "./Learn.css";
import Header from "../../utils/header/Header";
import CourseCard from "../../utils/courseCard/CourseCard";
import NoData from "../../utils/noData/NoData";
import { getLearningData } from "./learnSlice";
import Footer from "../../utils/footer/Footer";

const useStyles = makeStyles({
    searchInput: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Quicksand, sans-serif",
    },
});

const PendingCourses = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = useState("");

    const userId = useSelector((state) => state.profile.userId);
    const isLoading = useSelector((state) => state.learn.isLoading);
    const pendingCourses = useSelector((state) => state.learn.pendingCourses);

    useEffect(() => {
        dispatch(getLearningData(userId));
    }, [dispatch, userId]);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className="appBody">
            <Header headerUrl="learn" />
            <div className="appContents">
                <Container style={{ marginTop: 50 }}>
                    <div className="pageHeading">Pending Courses</div>
                    <Divider style={{ marginBottom: 30 }} />
                    {isLoading ? (
                        <div
                            style={{
                                width: "100%",
                                marginTop: 50,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <CircularProgress style={{ color: "#ffb901" }} />
                        </div>
                    ) : pendingCourses.length === 0 ? (
                        <NoData fontColor="#ffb901" />
                    ) : (
                        <div>
                            <div className="searchDiv">
                                <div className="searchBar">
                                    <SearchIcon
                                        className="searchIcon"
                                        style={{ fontSize: 30 }}
                                    />
                                    <Input
                                        className={classes.searchInput}
                                        value={searchValue}
                                        disableUnderline={true}
                                        placeholder="Search..."
                                        autoFocus
                                        onChange={handleSearch}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            {pendingCourses
                                .filter((course) => {
                                    let re = new RegExp(searchValue, "gi");
                                    if (searchValue === "") {
                                        return true;
                                    }
                                    let allCheck = true;
                                    allCheck =
                                        re.test(course.title) ||
                                        re.test(course.desc);
                                    course.tagArray.forEach((tag) => {
                                        allCheck =
                                            allCheck || re.test(tag.label);
                                    });
                                    return allCheck;
                                })
                                .map((course) => (
                                    <CourseCard
                                        textColor="#ffb901"
                                        courseTitle={course.title}
                                        courseDesc={course.desc}
                                        courseTags={course.tagArray}
                                        bgColor="#fdf4dd"
                                        courseId={course.courseId}
                                        key={course.courseId}
                                    />
                                ))}
                        </div>
                    )}
                </Container>
            </div>
            <Footer headerUrl="learn" />
        </div>
    );
};

export default PendingCourses;
