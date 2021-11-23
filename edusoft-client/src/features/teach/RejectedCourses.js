import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Divider, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";

import "./Teach.css";
import Header from "../../utils/header/Header";
import CourseCard from "../../utils/courseCard/CourseCard";
import { getTeachingData } from "./teachSlice";
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

const RejectedCourses = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = useState("");

    // Data from redux store
    const userId = useSelector((state) => state.profile.userId);
    const isLoading = useSelector((state) => state.teach.isLoading);
    const rejectedCourses = useSelector((state) => state.teach.rejectedCourses);

    useEffect(() => {
        dispatch(getTeachingData(userId));
    }, [dispatch, userId]);

    const handleSearch = (e) => {
        const res = e.target.value;
        setSearchValue(res);
    };

    return (
        <div className="appBody">
            <Header headerUrl="teach" />
            <div className="appContents">
                <Container style={{ marginTop: 50 }}>
                    <div className="pageHeading">Rejected Courses</div>
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
                            <CircularProgress style={{ color: "#f25022" }} />
                        </div>
                    ) : rejectedCourses.length === 0 ? (
                        <NoData fontColor="#f25022" />
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

                            {rejectedCourses
                                .filter((course) => {
                                    let re = new RegExp(
                                        searchValue.trim(),
                                        "gi"
                                    );
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
                                        textColor="#f25022"
                                        courseTitle={course.title}
                                        courseDesc={course.desc}
                                        courseTags={course.tagArray}
                                        bgColor="#f7d7cd"
                                        courseId={course.courseId}
                                        key={course.courseId}
                                    />
                                ))}
                        </div>
                    )}
                </Container>
            </div>
            <Footer headerUrl="teach" />
        </div>
    );
};

export default RejectedCourses;
