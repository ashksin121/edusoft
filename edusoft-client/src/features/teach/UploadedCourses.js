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

const UploadedCourses = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = useState("");

    // Data from Redux store
    const userId = useSelector((state) => state.profile.userId);
    const isLoading = useSelector((state) => state.teach.isLoading);
    const uploadedCourses = useSelector((state) => state.teach.uploadedCourses);
    const acceptedCourseIds = useSelector(
        (state) => state.teach.acceptedCourseIds
    );
    const rejectedCourseIds = useSelector(
        (state) => state.teach.rejectedCourseIds
    );

    useEffect(() => {
        dispatch(getTeachingData(userId));
    }, [dispatch, userId]);

    const handleSearch = (e) => {
        const res = e.target.value.trim();
        setSearchValue(res);
    };

    return (
        <div className="appBody">
            <Header headerUrl="teach" />
            <div className="appContents">
                <Container style={{ marginTop: 50 }}>
                    <div className="pageHeading">Uploaded Courses</div>
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
                    ) : uploadedCourses.length === 0 ? (
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

                            {uploadedCourses
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
                                        textColor={
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
                                        courseTitle={course.title}
                                        courseDesc={course.desc}
                                        courseTags={course.tagArray}
                                        bgColor={
                                            rejectedCourseIds.includes(
                                                course.courseId
                                            )
                                                ? "#f7d7cd"
                                                : acceptedCourseIds.includes(
                                                      course.courseId
                                                  )
                                                ? "#e0f7b0"
                                                : "#d5e7f0"
                                        }
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

export default UploadedCourses;
