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
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import "./CourseDetails.css";
import Header from "../../utils/header/Header";
import UploadedDocumentCard from "../../utils/uploadedDocumentCard/UploadedDocumentCard";
import { db } from "../../firebase";
import { logIn } from "../profile/profileSlice";
import { getLearningData } from "../learn/learnSlice";
import { getTeachingData } from "../teach/teachSlice";
import Footer from "../../utils/footer/Footer";

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
    const dispatch = useDispatch();

    // Local state
    const [courseId, setCourseId] = useState("");
    const [courseData, setCourseData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [answers, setAnswers] = useState(["", "", "", "", ""]);
    const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);

    // Data from redux store
    const userId = useSelector((state) => state.profile.userId);
    const coins = useSelector((state) => state.profile.coins);
    const profileLoading = useSelector((state) => state.profile.isLoading);
    const learnLoading = useSelector((state) => state.learn.isLoading);
    const teachLoading = useSelector((state) => state.teach.isLoading);
    const pendingCoursesIds = useSelector(
        (state) => state.learn.pendingCoursesIds
    );
    const completedCoursesIds = useSelector(
        (state) => state.learn.completedCoursesIds
    );
    const answersMap = useSelector((state) => state.learn.answersMap);

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

    // Allows user to enroll to selected course
    const handleEnrollToCourse = () => {
        setIsLoading(true);
        let newPendingCourses = [...pendingCoursesIds];
        newPendingCourses.push(courseId);
        const docRef = doc(db, "users", userId);
        setDoc(docRef, { pendingCourses: newPendingCourses }, { merge: true });
        const uid = userId;
        dispatch(logIn(uid));
        dispatch(getLearningData(uid));
        dispatch(getTeachingData(uid));
        setIsLoading(false);
    };

    // Allows user to submit quiz and end course
    const handleSubmitQuiz = () => {
        setIsSubmittingQuiz(true);
        let allCheck = true;
        answers.forEach((ans) => {
            if (ans.length === 0 || parseInt(ans) < 1 || parseInt(ans) > 4) {
                allCheck = false;
            }
        });
        if (!allCheck) {
            toast.error("Missing or Invalid Data", {
                containerId: "toastMessage",
            });
            setIsSubmittingQuiz(false);
            return;
        }
        let marks = 0;
        let i = 0;
        for (i = 0; i < 5; i++) {
            if (courseData.questions[i].answer === answers[i]) {
                marks++;
            }
        }
        let newPendingCourses = [...pendingCoursesIds];
        const index = newPendingCourses.indexOf(courseId);
        newPendingCourses.splice(index, 1);
        let newCompletedCourses = [...completedCoursesIds];
        newCompletedCourses.push(courseId);
        let newAnswersMap = {
            ...answersMap,
            [courseId]: marks,
        };
        const newCoins = coins + marks * 2;
        const docRef = doc(db, "users", userId);
        setDoc(
            docRef,
            {
                answersMap: newAnswersMap,
                coins: newCoins,
                completedCourses: newCompletedCourses,
                pendingCourses: newPendingCourses,
            },
            { merge: true }
        );
        const uid = userId;
        dispatch(logIn(uid));
        dispatch(getLearningData(uid));
        dispatch(getTeachingData(uid));
        setIsLoading(false);
        setIsSubmittingQuiz(false);
    };

    return (
        <div className="appBody">
            <Header headerUrl="course" />
            {isLoading ||
            courseData === null ||
            learnLoading ||
            teachLoading ||
            profileLoading ? (
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
                <div className="appContents">
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
                                The course was rejected because{" "}
                                {courseData.rejectRemarks}
                            </div>
                        ) : null}

                        {courseData.status === "REVIEW" &&
                        userId === courseData.instructorId ? (
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

                        {courseData.instructorId === userId ||
                        pendingCoursesIds.includes(courseId) ||
                        completedCoursesIds.includes(courseId) ? (
                            <div>
                                <Grid
                                    container
                                    spacing={2}
                                    style={{ marginBottom: 50 }}
                                >
                                    {courseData.fileUrl.map((fUrl, idx) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={3}
                                            key={idx}
                                        >
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
                                {completedCoursesIds.includes(courseId) ? (
                                    <div className="courseScoreCont">
                                        <div>Your Score:</div>
                                        <div>{answersMap[courseId]}/5</div>
                                    </div>
                                ) : null}
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
                                                        className={
                                                            classes.textField
                                                        }
                                                        style={{
                                                            marginBottom:
                                                                "30px",
                                                        }}
                                                    >
                                                        <TextField
                                                            fullWidth
                                                            label={`Option ${
                                                                indx + 1
                                                            }`}
                                                            value={opt}
                                                            disabled
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
                                                label={`${
                                                    completedCoursesIds.includes(
                                                        courseId
                                                    ) ||
                                                    userId ===
                                                        courseData.instructorId
                                                        ? "Correct "
                                                        : ""
                                                }Answer ${idx + 1}`}
                                                value={
                                                    completedCoursesIds.includes(
                                                        courseId
                                                    ) ||
                                                    userId ===
                                                        courseData.instructorId
                                                        ? ques.answer
                                                        : answers[idx]
                                                }
                                                type="number"
                                                placeholder="Enter the correct option number (1, 2, 3, 4)"
                                                disabled={
                                                    userId ===
                                                        courseData.instructorId ||
                                                    completedCoursesIds.includes(
                                                        courseId
                                                    )
                                                }
                                                InputProps={{
                                                    inputProps: {
                                                        max: 4,
                                                        min: 1,
                                                    },
                                                }}
                                                onChange={(e) => {
                                                    let newAnswers = [
                                                        ...answers,
                                                    ];
                                                    const res =
                                                        e.target.value.trim();
                                                    newAnswers[idx] = res;
                                                    setAnswers(newAnswers);
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                ))}
                            </div>
                        ) : null}

                        {courseData.instructorId !== userId &&
                        !pendingCoursesIds.includes(courseId) &&
                        !completedCoursesIds.includes(courseId) ? (
                            <Button
                                fullWidth
                                variant="contained"
                                style={{
                                    fontSize: 25,
                                    backgroundColor: "#7fba00",
                                    marginBottom: 50,
                                    marginTop: 20,
                                    borderRadius: 25,
                                    fontFamily: "Quicksand, sans-serif",
                                    fontWeight: "bold",
                                }}
                                onClick={handleEnrollToCourse}
                            >
                                Enroll to course
                            </Button>
                        ) : null}

                        {pendingCoursesIds.includes(courseId) &&
                        !isSubmittingQuiz ? (
                            <Button
                                fullWidth
                                variant="contained"
                                style={{
                                    fontSize: 25,
                                    backgroundColor: "#7fba00",
                                    marginBottom: 50,
                                    marginTop: 20,
                                    borderRadius: 25,
                                    fontFamily: "Quicksand, sans-serif",
                                    fontWeight: "bold",
                                }}
                                onClick={handleSubmitQuiz}
                            >
                                Submit Quiz
                            </Button>
                        ) : isSubmittingQuiz ? (
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: 50,
                                    marginBottom: 50,
                                }}
                            >
                                <CircularProgress
                                    style={{ color: "#7fba00" }}
                                />
                            </div>
                        ) : null}
                    </Container>
                </div>
            )}
            <Footer headerUrl="none" />
        </div>
    );
};

export default CourseDetails;
