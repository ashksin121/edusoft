import React, { useState } from "react";
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
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useHistory } from "react-router";
import { addDoc, collection } from "@firebase/firestore";

import Header from "../../utils/header/Header";
import UploadedDocumentCard from "../../utils/uploadedDocumentCard/UploadedDocumentCard";
import { db } from "../../firebase";
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
    formDiv: {
        "& .MuiInput-underline:after": {
            borderBottom: "2px solid #8D8D8D",
        },
        "& .MuiInput-underline:hover": {
            borderBottom: "0px solid #8D8D8D",
        },
        "& .MuiFormLabel-root": {
            color: "#8D8D8D",
            fontSize: "16px",
            lineHeight: "21px",
        },
        fontFamily: "Quicksand, sans-serif",
    },
});

const AddCourse = () => {
    const classes = useStyles();
    const history = useHistory();

    // Data from redux store
    const userId = useSelector((state) => state.profile.userId);

    // Local state
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [tags, setTags] = useState("");
    const [tagArray, setTagArray] = useState([]);
    const [filesArray, setFilesArray] = useState([]);
    const [questions, setQuestions] = useState([
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
    ]);

    // Adds tag to course
    const handleAddTag = () => {
        const d = new Date();
        const tagObj = {
            key: d.toString(),
            label: tags.trim(),
        };
        let tagArr = tagArray;
        tagArr.push(tagObj);
        setTagArray(tagArr);
        setTags("");
    };

    // Deletes added tag of course
    const handleDelete = (chipToDelete) => () => {
        setTagArray((chips) =>
            chips.filter((chip) => chip.key !== chipToDelete.key)
        );
    };

    // Handles uploaded file delete
    const handleCardClick = (fileToDelete) => {
        setFilesArray((files) => files.filter((file) => file !== fileToDelete));
    };

    // Allows user to submit course
    const handleSubmit = () => {
        setIsLoading(true);
        let allCheck = true;

        if (
            title.trim() === "" ||
            desc.trim() === "" ||
            tagArray.length === 0 ||
            filesArray.length === 0
        ) {
            allCheck = false;
        }
        questions.forEach((ques) => {
            if (ques.question.trim === "") {
                allCheck = false;
            }
            if (
                ques.answer.trim() === "" ||
                parseInt(ques.answer) < 1 ||
                parseInt(ques.answer) > 4
            ) {
                allCheck = false;
            }
            ques.options.forEach((opt) => {
                if (opt.trim() === "") {
                    allCheck = false;
                }
            });
        });
        if (!allCheck) {
            toast.error("Missing or Invalid Data", {
                containerId: "toastMessage",
            });
            setIsLoading(false);
            return;
        }
        const promises = [];
        const urlPromises = [];
        let fileRef = [];
        let fileUrl = [];
        filesArray.forEach((file) => {
            const storage = getStorage();
            const storageRef = ref(storage, userId + "/" + file.name);
            const uploadTask = uploadBytes(storageRef, file).then(
                (snapshot) => {
                    fileRef.push(storageRef);
                }
            );
            promises.push(uploadTask);
        });
        Promise.all(promises)
            .then((tasks) => {
                fileRef.forEach((storeRef) => {
                    const getUrlTask = getDownloadURL(storeRef).then((url) => {
                        fileUrl.push(url);
                    });
                    urlPromises.push(getUrlTask);
                });
                Promise.all(urlPromises).then(async (tasks) => {
                    const courseData = {
                        title: title.trim(),
                        desc: desc.trim(),
                        tagArray: tagArray,
                        fileUrl: fileUrl,
                        questions: questions,
                        instructorId: userId,
                        status: "REVIEW",
                    };
                    await addDoc(collection(db, "courses"), courseData);
                    history.push("/teach/uploadedCourses");
                });
            })
            .catch((e) => {
                setIsLoading(false);
            });
    };

    return (
        <div className="appBody">
            <Header headerUrl="teach" />
            <div className="appContents">
                <Container style={{ paddingTop: 50 }}>
                    <div className="pageHeading">Add New Course</div>
                    <Divider style={{ marginBottom: 30 }} />
                    <div className="pageSubHeading">Course Details</div>
                    <Divider style={{ marginBottom: 30 }} />

                    <form className={classes.formDiv}>
                        <FormControl
                            className={classes.textField}
                            style={{ marginBottom: "30px" }}
                        >
                            <TextField
                                fullWidth
                                label="Course Title"
                                value={title}
                                onChange={(e) => {
                                    const res = e.target.value;
                                    setTitle(res);
                                }}
                                inputProps={{ maxLength: 50 }}
                                helperText={`${title.length}/50`}
                            />
                        </FormControl>

                        <FormControl
                            className={classes.textField}
                            style={{ marginBottom: "30px" }}
                        >
                            <TextField
                                fullWidth
                                label="Course Description"
                                multiline
                                rows={5}
                                value={desc}
                                onChange={(e) => {
                                    const res = e.target.value;
                                    setDesc(res);
                                }}
                                inputProps={{ maxLength: 500 }}
                                helperText={`${desc.length}/500`}
                            />
                        </FormControl>

                        <FormControl
                            className={classes.textField}
                            style={{ marginBottom: "30px", display: "flex" }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={10}>
                                    <TextField
                                        fullWidth
                                        label="Course Tags"
                                        value={tags}
                                        onChange={(e) => {
                                            const res = e.target.value;
                                            setTags(res);
                                        }}
                                        inputProps={{ maxLength: 25 }}
                                        helperText={`${tags.length}/25`}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={2}>
                                    <Button
                                        variant="contained"
                                        onClick={handleAddTag}
                                        fullWidth
                                        disabled={tags.trim() === ""}
                                    >
                                        Add Tag
                                    </Button>
                                </Grid>
                            </Grid>
                        </FormControl>

                        {tagArray.length > 0 ? (
                            <Paper
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flexWrap: "wrap",
                                    listStyle: "none",
                                    p: 0.5,
                                    m: 0,
                                    marginBottom: "30px",
                                }}
                                component="ul"
                            >
                                {tagArray.map((data) => {
                                    return (
                                        <ListItem key={data.key}>
                                            <Chip
                                                label={data.label}
                                                onDelete={handleDelete(data)}
                                            />
                                        </ListItem>
                                    );
                                })}
                            </Paper>
                        ) : null}

                        <FormControl
                            className={classes.textField}
                            style={{ marginBottom: "30px" }}
                        >
                            <input
                                style={{ display: "none" }}
                                id="uploadPDFs"
                                multiple
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => {
                                    setFilesArray([
                                        ...filesArray,
                                        ...e.target.files,
                                    ]);
                                }}
                            />
                            <label htmlFor="uploadPDFs">
                                <Button
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                    fullWidth
                                    component="span"
                                >
                                    Add Files
                                </Button>
                            </label>
                        </FormControl>

                        {filesArray.length > 0 ? (
                            <div style={{ marginBottom: 30 }}>
                                <div style={{ marginBottom: 10 }}>
                                    Click on the files to delete them
                                </div>
                                <Grid container spacing={2}>
                                    {filesArray.map((file, key) => (
                                        <Grid
                                            key={key}
                                            item
                                            xs={12}
                                            sm={6}
                                            md={3}
                                        >
                                            <UploadedDocumentCard
                                                cardTitle={file.name}
                                                fileData={file}
                                                onClick={handleCardClick}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        ) : null}
                    </form>

                    <div className="pageSubHeading">Quiz Details</div>
                    <Divider style={{ marginBottom: 30 }} />
                    {questions.map((ques, idx) => (
                        <div key={idx} className="quizCard">
                            <FormControl
                                className={classes.textField}
                                style={{ marginBottom: "30px" }}
                            >
                                <TextField
                                    fullWidth
                                    label={`Question ${idx + 1}`}
                                    value={ques.question}
                                    onChange={(e) => {
                                        let newQuestions = [...questions];
                                        const res = e.target.value;
                                        newQuestions[idx].question = res;
                                        setQuestions(newQuestions);
                                    }}
                                />
                            </FormControl>

                            <Grid container spacing={2}>
                                {ques.options.map((opt, indx) => (
                                    <Grid key={indx} item xs={12} sm={6} md={3}>
                                        <FormControl
                                            className={classes.textField}
                                            style={{ marginBottom: "30px" }}
                                        >
                                            <TextField
                                                fullWidth
                                                label={`Option ${indx + 1}`}
                                                value={opt}
                                                onChange={(e) => {
                                                    let newQuestions = [
                                                        ...questions,
                                                    ];
                                                    const res = e.target.value;
                                                    newQuestions[idx].options[
                                                        indx
                                                    ] = res;
                                                    setQuestions(newQuestions);
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
                                    InputProps={{
                                        inputProps: {
                                            max: 4,
                                            min: 1,
                                        },
                                    }}
                                    onChange={(e) => {
                                        let newQuestions = [...questions];
                                        const res = e.target.value;
                                        newQuestions[idx].answer = res;
                                        setQuestions(newQuestions);
                                    }}
                                />
                            </FormControl>
                        </div>
                    ))}

                    {isLoading ? (
                        <div
                            className="loginCircularProgress"
                            style={{ marginBottom: 50 }}
                        >
                            <CircularProgress
                                style={{
                                    color: "#f25022",
                                    marginTop: 50,
                                }}
                            />
                        </div>
                    ) : (
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<CheckIcon style={{ fontSize: 35 }} />}
                            style={{
                                fontSize: 25,
                                backgroundColor: "#7fba00",
                                marginBottom: 50,
                                marginTop: 20,
                                borderRadius: 25,
                                fontFamily: "Quicksand, sans-serif",
                                fontWeight: "bold",
                            }}
                            onClick={handleSubmit}
                        >
                            Submit for approval
                        </Button>
                    )}
                </Container>
            </div>
            <Footer headerUrl="teach" />
        </div>
    );
};

export default AddCourse;
