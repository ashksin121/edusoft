import React, { useEffect, useState } from "react";
import {
    Button,
    CircularProgress,
    Container,
    Grid,
    Input,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { Chip, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
} from "@firebase/firestore";

import "./Dashboard.css";
import NoData from "../../utils/noData/NoData";
import UploadedDocumentCard from "../../utils/uploadedDocumentCard/UploadedDocumentCard";
import { db } from "../../firebase";
import Header from "../../utils/header/Header";
import Footer from "../../utils/footer/Footer";

const useStyles = makeStyles({
    searchInput: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Quicksand, sans-serif",
    },
    dialogStyles: {
        "& .MuiDialogTitle-root": {
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bolder",
            textAlign: "center",
            fontSize: 25,
        },
        "& .MuiDialogContentText-root": {
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
        },
        "& .MuiInputLabel-root": {
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
        },
        "& .MuiInput-root": {
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
        },
        "& .MuiButton-root": {
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
        },
    },
    divStyle: {
        "& .MuiButton-root": {
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
        },
    },
});

const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const Dashboard = () => {
    const classes = useStyles();

    // Local states
    const [isLoading, setIsLoading] = useState(false);
    const [allCourses, setAllCourses] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [openAccept, setOpenAccept] = useState(false);
    const [openReject, setOpenReject] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [acceptPoints, setAcceptPoints] = useState("");
    const [rejectRemarks, setRejectRemarks] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [instructorId, setInstructorId] = useState("");
    const [reload, setReload] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const q = query(
                collection(db, "courses"),
                where("status", "==", "REVIEW")
            );
            const querySnaphot = await getDocs(q);
            let courses = [];
            querySnaphot.forEach((doc) => {
                let courseData = doc.data();
                courseData.courseId = doc.id;
                courses.push(courseData);
            });
            setAllCourses(courses);
        };

        setIsLoading(true);
        fetchData();
        setIsLoading(false);
    }, [setIsLoading, reload]);

    const handleSearch = (e) => {
        const res = e.target.value.trim();
        setSearchValue(res);
    };

    const handleClose = () => {
        setOpenReject(false);
        setOpenAccept(false);
        setIsUpdate(false);
        setAcceptPoints("");
        setRejectRemarks("");
        setSelectedCourseId("");
        setInstructorId("");
    };

    // Accpets the selected course
    const handleCourseAccept = async () => {
        setIsUpdate(true);
        if (
            acceptPoints.trim() === "" ||
            parseInt(acceptPoints) < 1 ||
            parseInt(acceptPoints) > 10
        ) {
            toast.error("Invalid Points", {
                containerId: "toastMessage",
            });
            setIsUpdate(false);
            return;
        }
        const docRef = doc(db, "users", instructorId);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        let coins = userData.coins;
        coins = coins + parseInt(acceptPoints);

        const dataRef = doc(db, "courses", selectedCourseId);
        setDoc(dataRef, { status: "ACCEPTED" }, { merge: true });

        const userRef = doc(db, "users", instructorId);
        setDoc(userRef, { coins: coins }, { merge: true });
        setReload(!reload);
        handleClose();
    };

    // Rejects the selected course
    const handleCourseReject = async () => {
        setIsUpdate(true);
        if (rejectRemarks.trim() === "") {
            toast.error("Invalid Comments", {
                containerId: "toastMessage",
            });
            setIsUpdate(false);
            return;
        }

        const dataRef = doc(db, "courses", selectedCourseId);
        setDoc(
            dataRef,
            { status: "REJECTED", rejectRemarks: rejectRemarks.trim() },
            { merge: true }
        );
        setReload(!reload);
        handleClose();
    };

    return (
        <div className="appBody">
            <Header headerUrl="courses" />
            <div className="appContents">
                <Container style={{ marginTop: 50 }}>
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
                        <div className={classes.divStyle}>
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
                                .map((course, idx) => (
                                    <Accordion
                                        style={{ marginBottom: 50 }}
                                        key={idx}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <div className="cardTitle">
                                                {course.title}
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className="cardDesc">
                                                {course.desc}
                                            </div>
                                            <Paper
                                                sx={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    listStyle: "none",
                                                    padding: 0,
                                                    backgroundColor:
                                                        "transparent",
                                                }}
                                                component="ul"
                                                elevation={0}
                                                style={{ marginBottom: 20 }}
                                            >
                                                {course.tagArray.map((data) => {
                                                    return (
                                                        <ListItem
                                                            key={data.key}
                                                        >
                                                            <Chip
                                                                label={
                                                                    data.label
                                                                }
                                                            />
                                                        </ListItem>
                                                    );
                                                })}
                                            </Paper>
                                            <Grid
                                                container
                                                spacing={2}
                                                style={{ marginBottom: 20 }}
                                            >
                                                {course.fileUrl.map(
                                                    (file, indx) => (
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            sm={6}
                                                            md={3}
                                                            key={indx}
                                                        >
                                                            <UploadedDocumentCard
                                                                cardTitle={`File ${
                                                                    indx + 1
                                                                }`}
                                                                fileData="NA"
                                                                onClick={() => {
                                                                    window.open(
                                                                        file
                                                                    );
                                                                }}
                                                            />
                                                        </Grid>
                                                    )
                                                )}
                                            </Grid>
                                            <div className="cardButtonBar">
                                                <Grid container spacing={2}>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sm={6}
                                                        md={6}
                                                    >
                                                        <Button
                                                            variant="contained"
                                                            startIcon={
                                                                <CheckCircleIcon />
                                                            }
                                                            style={{
                                                                width: "100%",
                                                                backgroundColor:
                                                                    "#7fba00",
                                                            }}
                                                            onClick={() => {
                                                                setInstructorId(
                                                                    course.instructorId
                                                                );
                                                                setSelectedCourseId(
                                                                    course.courseId
                                                                );
                                                                setOpenAccept(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            Accept
                                                        </Button>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sm={6}
                                                        md={6}
                                                    >
                                                        <Button
                                                            variant="contained"
                                                            startIcon={
                                                                <CancelIcon />
                                                            }
                                                            style={{
                                                                width: "100%",
                                                                backgroundColor:
                                                                    "#f25022",
                                                            }}
                                                            onClick={() => {
                                                                setInstructorId(
                                                                    course.instructorId
                                                                );
                                                                setSelectedCourseId(
                                                                    course.courseId
                                                                );
                                                                setOpenReject(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                        </div>
                    )}
                </Container>

                {/* Dialog box for accepting course */}
                <Dialog
                    open={openAccept}
                    onClose={handleClose}
                    className={classes.dialogStyles}
                >
                    <DialogTitle>Accept Course</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Accept the course if you like the course contents
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Points for acceptance"
                            type="number"
                            fullWidth
                            variant="standard"
                            placeholder="Give points out of 10"
                            value={acceptPoints}
                            onChange={(e) => {
                                const res = e.target.value;
                                setAcceptPoints(res);
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        {isUpdate ? (
                            <CircularProgress />
                        ) : (
                            <div>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button
                                    onClick={handleCourseAccept}
                                    style={{ color: "#7fba00" }}
                                >
                                    Accept
                                </Button>
                            </div>
                        )}
                    </DialogActions>
                </Dialog>

                {/* Dialog box for rejecting course */}
                <Dialog
                    open={openReject}
                    onClose={handleClose}
                    className={classes.dialogStyles}
                >
                    <DialogTitle>Reject Course</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Reject course if the course material is not
                            appropriate
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Reason for rejection"
                            type="number"
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={5}
                            value={rejectRemarks}
                            onChange={(e) => {
                                const res = e.target.value;
                                setRejectRemarks(res);
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        {isUpdate ? (
                            <CircularProgress />
                        ) : (
                            <div>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button
                                    onClick={handleCourseReject}
                                    style={{ color: "#f25022" }}
                                >
                                    Reject
                                </Button>
                            </div>
                        )}
                    </DialogActions>
                </Dialog>
            </div>
            <Footer headerUrl="courses" />
        </div>
    );
};

export default Dashboard;
