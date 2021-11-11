import React, { useState } from "react";
import { Container, Divider, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";

import "./Teach.css";
import Header from "../../utils/header/Header";
import CourseCard from "../../utils/courseCard/CourseCard";

const useStyles = makeStyles({
    searchInput: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Quicksand, sans-serif",
    },
});

const AcceptedCourses = () => {
    const classes = useStyles();

    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className="appBody">
            <Header headerUrl="teach" />
            <div style={{ width: "100%" }}>
                <Container style={{ marginTop: 50 }}>
                    <div className="pageHeading">Accepted Courses</div>
                    <Divider style={{ marginBottom: 30 }} />
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
                    <CourseCard
                        textColor="#7fba00"
                        courseTitle="Course Title"
                        courseDesc="Course Description"
                        courseTags={[]}
                        bgColor="#e0f7b0"
                        courseId="xyz"
                    />
                </Container>
            </div>
        </div>
    );
};

export default AcceptedCourses;
