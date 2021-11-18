import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Divider, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";

import "./Learn.css";
import Header from "../../utils/header/Header";
import CourseCard from "../../utils/courseCard/CourseCard";
import { getLearningData } from "./learnSlice";
import NoData from "../../utils/noData/NoData";
import Footer from "../../utils/footer/Footer";

const useStyles = makeStyles({
    searchInput: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Quicksand, sans-serif",
    },
});

const AllCourses = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const userId = useSelector((state) => state.profile.userId);
    const isLoading = useSelector((state) => state.learn.isLoading);
    const allCourses = useSelector((state) => state.learn.allCourses);

    useEffect(() => {
        dispatch(getLearningData(userId));
    }, [dispatch, userId]);

    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };
    console.log(allCourses);

    return (
        <div className="appBody">
            <Header headerUrl="learn" />
            <div className="appContents">
                <Container style={{ marginTop: 50 }}>
                    <div className="pageHeading">All Courses</div>
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
                            <CircularProgress style={{ color: "#00a4ef" }} />
                        </div>
                    ) : allCourses.length === 0 ? (
                        <NoData fontColor="#00a4ef" />
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
                            {allCourses
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
                                        textColor="#00a4ef"
                                        courseTitle={course.title}
                                        courseDesc={course.desc}
                                        courseTags={course.tagArray}
                                        bgColor="#d5e7f0"
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

export default AllCourses;
