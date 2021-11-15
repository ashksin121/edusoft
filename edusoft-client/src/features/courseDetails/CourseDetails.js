import React, { useEffect, useState } from "react";
import {
    Button,
    Chip,
    CircularProgress,
    Container,
    Divider,
    FormControl,
    Grid,
    Paper,
    TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { doc, getDoc } from "@firebase/firestore";
import { useHistory } from "react-router";

import "./CourseDetails.css";
import Header from "../../utils/header/Header";
import UploadedDocumentCard from "../../utils/uploadedDocumentCard/UploadedDocumentCard";
import { db } from "../../firebase";
import { useSelector } from "react-redux";

const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const useStyles = makeStyles({
    textField: {
        minWidth: 250,
        marginBottom: 50,
        width: "100%",
        "& label.Mui-focused": {
            color: "#8D8D8D",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#8D8D8D",
        },
        "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
                borderColor: "#8D8D8D",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#8D8D8D",
            },
            fontFamily: "Quicksand, sans-serif",
        },
        "& .MuiFormHelperText-root": {
            textAlign: "right",
        },
    },
});

const CourseDetails = () => {
    const classes = useStyles();
    const history = useHistory();

    const [courseId, setCourseId] = useState("");
    const [courseData, setCourseData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const userId = useSelector((state) => state.profile.userId);

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "courses", courseId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setCourseData(docSnap.data());
            } else {
                history.goBack();
            }
        };

        setIsLoading(true);
        const paths = window.location.pathname.split("/");
        const courseId = paths[paths.length - 1];
        setCourseId(courseId);
        fetchData();
        setIsLoading(false);
    }, [setCourseId, history]);

    const tagArray = [
        { key: 0, label: "Angular" },
        { key: 1, label: "jQuery" },
        { key: 2, label: "Polymer" },
        { key: 3, label: "React" },
        { key: 4, label: "Vue.js" },
    ];

    const questions = [
        {
            question: "",
            options: ["", "", "", ""],
            answer: "",
        },
        {
            question: "",
            options: ["", "", "", ""],
            answer: "",
        },
        {
            question: "",
            options: ["", "", "", ""],
            answer: "",
        },
        {
            question: "",
            options: ["", "", "", ""],
            answer: "",
        },
        {
            question: "",
            options: ["", "", "", ""],
            answer: "",
        },
    ];

    return (
        <div className="appBody">
            <Header headerUrl="course" />
            {isLoading || courseData === null ? (
                <div
                    style={{
                        width: "100%",
                        marginTop: 50,
                        textAlign: "center",
                    }}
                >
                    <CircularProgress />
                </div>
            ) : (
                <div style={{ width: "100%" }}>
                    <Container>
                        <div className="courseDetailsTitleCont">
                            <div className="courseDetailsImage">
                                <div className="courseDetailsOverlay">
                                    {courseData.title}
                                </div>
                            </div>
                        </div>
                        {courseData.status === "REJECTED" ? (
                            <div className="courseDetailsRejection">
                                The course was rejected because
                            </div>
                        ) : null}
                        {courseData.status === "REVIEW" ? (
                            <div className="courseDetailsAccept">
                                Your course is yet to be accepted!!
                            </div>
                        ) : null}
                        <div className="courseDetailsDesc">
                            {courseData.desc}
                        </div>
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
                            style={{ marginBottom: 50 }}
                        >
                            {courseData.tagArray.map((data) => {
                                return (
                                    <ListItem key={data.key}>
                                        <Chip
                                            label={data.label}
                                            style={{
                                                fontWeight: "bold",
                                            }}
                                        />
                                    </ListItem>
                                );
                            })}
                        </Paper>
                        <Grid
                            container
                            spacing={2}
                            style={{ marginBottom: 50 }}
                        >
                            {courseData.fileUrl.map((fUrl, idx) => (
                                <Grid item xs={12} sm={6} md={3} key={idx}>
                                    <UploadedDocumentCard
                                        cardTitle={`File ${idx + 1}`}
                                        fileData="NA"
                                        onClick={() => {
                                            window.open(fUrl);
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <div className="pageSubHeading">Quiz</div>
                        <Divider style={{ marginBottom: 30 }} />
                        <div className="courseScoreCont">
                            <div>Your Score:</div>
                            <div>3/5</div>
                        </div>
                        {courseData.questions.map((ques, idx) => (
                            <div key={idx} className="quizCard">
                                <FormControl
                                    className={classes.textField}
                                    style={{ marginBottom: "30px" }}
                                >
                                    <TextField
                                        fullWidth
                                        label={`Question ${idx + 1}`}
                                        value={ques.question}
                                        disabled
                                        onChange={(e) => {
                                            let newQuestions = [...questions];
                                            newQuestions[idx].question =
                                                e.target.value;
                                            // setQuestions(newQuestions);
                                        }}
                                    />
                                </FormControl>
                                <Grid container spacing={2}>
                                    {ques.options.map((opt, indx) => (
                                        <Grid
                                            key={indx}
                                            item
                                            xs={12}
                                            sm={6}
                                            md={3}
                                        >
                                            <FormControl
                                                className={classes.textField}
                                                style={{ marginBottom: "30px" }}
                                            >
                                                <TextField
                                                    fullWidth
                                                    label={`Option ${indx + 1}`}
                                                    value={opt}
                                                    disabled
                                                    onChange={(e) => {
                                                        let newQuestions = [
                                                            ...questions,
                                                        ];
                                                        newQuestions[
                                                            idx
                                                        ].options[indx] =
                                                            e.target.value;
                                                        // setQuestions(newQuestions);
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                    ))}
                                </Grid>
                                <FormControl
                                    className={classes.textField}
                                    style={{ marginBottom: "30px" }}
                                >
                                    <TextField
                                        fullWidth
                                        label={`Answer ${idx + 1}`}
                                        value={ques.answer}
                                        type="number"
                                        placeholder="Enter the correct option number (1, 2, 3, 4)"
                                        disabled={
                                            userId === courseData.instructorId
                                        }
                                        InputProps={{
                                            inputProps: {
                                                max: 4,
                                                min: 1,
                                            },
                                        }}
                                        onChange={(e) => {
                                            let newQuestions = [...questions];
                                            newQuestions[idx].answer =
                                                e.target.value;
                                            // setQuestions(newQuestions);
                                        }}
                                    />
                                </FormControl>
                            </div>
                        ))}
                        <Button
                            fullWidth
                            variant="contained"
                            style={{
                                fontSize: 25,
                                backgroundColor: "#7fba00",
                                marginBottom: 50,
                                marginTop: 20,
                            }}
                            onClick={() => {}}
                        >
                            Enroll to course
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{
                                fontSize: 25,
                                backgroundColor: "#7fba00",
                                marginBottom: 50,
                                marginTop: 20,
                            }}
                            onClick={() => {}}
                        >
                            Submit Quiz
                        </Button>
                    </Container>
                </div>
            )}
        </div>
    );
};

export default CourseDetails;
