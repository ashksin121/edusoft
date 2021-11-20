import React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Paper,
} from "@mui/material";
import { useHistory } from "react-router";
import { styled } from "@mui/material/styles";

import "./CourseTile.css";

const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const CourseTile = ({ courseName, courseTags, courseId, bgColor }) => {
    const history = useHistory();

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <div className="courseTileTitle">{courseName}</div>
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
                    {courseTags.map((data, idx) => {
                        if (idx < 3) {
                            return (
                                <ListItem key={data.key}>
                                    <Chip
                                        label={data.label}
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 12,
                                        }}
                                    />
                                </ListItem>
                            );
                        } else {
                            return null;
                        }
                    })}
                </Paper>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    variant="contained"
                    style={{
                        backgroundColor: bgColor || "#00a4ef",
                        fontWeight: "bold",
                        color: "white",
                        fontFamily: "Quicksand, sans-serif",
                    }}
                    onClick={() => {
                        history.push(`/course/${courseId}`);
                    }}
                >
                    Go To Course
                </Button>
            </CardActions>
        </Card>
    );
};

export default CourseTile;
