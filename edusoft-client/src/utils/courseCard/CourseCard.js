import React from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/material/styles";
import { Chip, Paper } from "@mui/material";
import { useHistory } from "react-router-dom";

import "./CourseCard.css";

const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const CourseCard = ({
    textColor,
    courseTitle,
    courseDesc,
    courseTags,
    bgColor,
    courseId,
}) => {
    let history = useHistory();

    const handleOnClick = () => {
        history.push(`/course/${courseId}`);
    };

    return (
        <div
            className="courseCardMain"
            style={{ color: textColor, backgroundColor: bgColor }}
            onClick={handleOnClick}
        >
            <div className="courseCardIconCont">
                <LibraryBooksIcon style={{ fontSize: 70 }} />
            </div>
            <div className="courseCardContents">
                <div className="courseCardTitle">{courseTitle}</div>
                <div className="courseCardDesc">{courseDesc}</div>
                <Paper
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        listStyle: "none",
                        padding: 0,
                        backgroundColor: "transparent",
                    }}
                    component="ul"
                    elevation={0}
                >
                    {courseTags.map((data) => {
                        return (
                            <ListItem key={data.key}>
                                <Chip
                                    label={data.label}
                                    style={{
                                        color: textColor,
                                        fontWeight: "bold",
                                    }}
                                />
                            </ListItem>
                        );
                    })}
                </Paper>
            </div>
            <div className="courseCardDetailsCont">
                <ArrowForwardIosIcon style={{ fontSize: 50 }} />
            </div>
        </div>
    );
};

export default CourseCard;
