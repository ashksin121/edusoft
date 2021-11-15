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

    const userId = useSelector((state) => state.profile.userId);
    const isLoading = useSelector((state) => state.teach.isLoading);
    const rejectedCourses = useSelector((state) => state.teach.rejectedCourses);

    useEffect(() => {
        dispatch(getTeachingData(userId));
    }, [dispatch, userId]);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className="appBody">
            <Header headerUrl="teach" />
            <div style={{ width: "100%" }}>
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
                            {rejectedCourses.map((course) => (
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
        </div>
    );
};

export default RejectedCourses;
