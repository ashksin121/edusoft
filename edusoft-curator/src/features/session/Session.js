import React, { useEffect, useState } from "react";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    Dialog,
    Divider,
    Grid,
    IconButton,
    Slide,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TimePicker from "@mui/lab/TimePicker";
import { isValid, isFuture, isAfter } from "date-fns";
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import moment from "moment";

import "./Session.css";
import Header from "../../utils/header/Header";
import NoData from "../../utils/noData/NoData";
import SessionCard from "../../utils/sessionCard/SessionCard";
import Footer from "../../utils/footer/Footer";
import { db } from "../../firebase";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Session = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [sessionName, setSessionName] = useState("");
    const [mentorName, setMentorName] = useState("");
    const [sessionDate, setSessionDate] = useState(null);
    const [sessionStartTime, setSessionStartTime] = useState(null);
    const [sessionEndTime, setSessionEndTime] = useState(null);
    const [seatsLeft, setSeatsLeft] = useState("");
    const [sessionUrl, setSessionUrl] = useState("");
    const [isAddingSession, setIsAddingSession] = useState(false);
    const [isReload, setIsReload] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "sessions"));
            let sessions = [];
            querySnapshot.forEach((doc) => {
                let sessionData = doc.data();
                sessionData.sessionId = doc.id;
                sessions.push(sessionData);
            });
            setSessions(sessions);
        };

        setIsLoading(true);
        fetchData();
        setIsLoading(false);
    }, [setIsLoading, isReload]);

    const handleClose = () => {
        setIsAddingSession(false);
        setIsOpen(false);
        setIsReload(!isReload);
    };

    const handleAddSession = async () => {
        setIsAddingSession(true);
        console.log(sessionStartTime);
        let allCheck = true;
        if (
            sessionName === "" ||
            mentorName === "" ||
            sessionUrl === "" ||
            seatsLeft === "" ||
            parseInt(seatsLeft) > 5
        ) {
            allCheck = false;
        }
        if (
            sessionDate === null ||
            sessionStartTime === null ||
            sessionEndTime === null
        ) {
            allCheck = false;
        }
        if (!isValid(sessionDate) || !isFuture(sessionDate)) {
            allCheck = false;
        }
        if (!isValid(sessionStartTime) || !isValid(sessionEndTime)) {
            allCheck = false;
        }
        if (!isAfter(sessionEndTime, sessionStartTime)) {
            allCheck = false;
        }
        if (!allCheck) {
            toast.error("Invalid Data", {
                containerId: "toastMessage",
            });
            setIsAddingSession(false);
            return;
        }
        const sessionData = {
            sessionName: sessionName,
            mentorName: mentorName,
            sessionDate: Timestamp.fromDate(sessionDate),
            sessionStartTime: Timestamp.fromDate(sessionStartTime),
            sessionEndTime: Timestamp.fromDate(sessionEndTime),
            seatsLeft: parseInt(seatsLeft),
            sessionUrl: sessionUrl,
        };
        console.log(sessionData);

        const sessionRef = await addDoc(
            collection(db, "sessions"),
            sessionData
        );
        handleClose();
    };

    console.log(sessions);

    return (
        <div className="appBody">
            <Header headerUrl="session" />
            <div className="appContents">
                <Container style={{ marginTop: 50 }}>
                    <div className="pageHeading">
                        <div>Sessions</div>
                        <div
                            variant="contained"
                            className="sessionButton"
                            onClick={() => {
                                setIsOpen(true);
                            }}
                        >
                            Add Session
                        </div>
                    </div>
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
                    ) : sessions.length === 0 ? (
                        <NoData fontColor="#00a4ef" />
                    ) : (
                        <div style={{ width: "100%" }}>
                            <Grid container spacing={2}>
                                {sessions
                                    .filter((session) => {
                                        let utc = session.sessionDate.seconds;
                                        let d = new Date(0);
                                        d.setUTCSeconds(utc);
                                        return (
                                            moment(d).isAfter(
                                                new Date(),
                                                "day"
                                            ) ||
                                            moment(d).isSame(new Date(), "day")
                                        );
                                    })
                                    .map((session) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            key={session.sessionId}
                                        >
                                            <SessionCard
                                                sessionName={
                                                    session.sessionName
                                                }
                                                influencerName={
                                                    session.mentorName
                                                }
                                                sessionDate={
                                                    session.sessionDate.seconds
                                                }
                                                sessionStartTime={
                                                    session.sessionStartTime
                                                        .seconds
                                                }
                                                sessionEndTime={
                                                    session.sessionEndTime
                                                        .seconds
                                                }
                                                seatsLeft={session.seatsLeft}
                                                sessionUrl={session.sessionUrl}
                                            />
                                        </Grid>
                                    ))}
                            </Grid>
                        </div>
                    )}
                </Container>
            </div>
            <Dialog
                fullScreen
                open={isOpen}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                            style={{
                                fontFamily: "Quicksand, sans-serif",
                            }}
                        >
                            New Session
                        </Typography>
                        {isAddingSession ? (
                            <CircularProgress style={{ color: "white" }} />
                        ) : (
                            <Button
                                autoFocus
                                color="inherit"
                                onClick={handleAddSession}
                                style={{
                                    fontFamily: "Quicksand, sans-serif",
                                }}
                            >
                                Add Session
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
                <Container style={{ marginTop: 50 }}>
                    <TextField
                        id="outlined-basic"
                        label="Session Name"
                        variant="outlined"
                        fullWidth
                        value={sessionName}
                        onChange={(e) => {
                            setSessionName(e.target.value);
                        }}
                        style={{ marginBottom: 50 }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Instructor Name"
                        variant="outlined"
                        fullWidth
                        value={mentorName}
                        onChange={(e) => {
                            setMentorName(e.target.value);
                        }}
                        style={{ marginBottom: 50 }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Session Date"
                            minDate={new Date()}
                            value={sessionDate}
                            onChange={(newValue) => {
                                setSessionDate(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    style={{ marginBottom: 50 }}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    label="Session Start Time"
                                    value={sessionStartTime}
                                    onChange={(newValue) => {
                                        setSessionStartTime(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ marginBottom: 50 }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    label="Session End Time"
                                    value={sessionEndTime}
                                    onChange={(newValue) => {
                                        setSessionEndTime(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ marginBottom: 50 }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <TextField
                        id="outlined-basic"
                        label="Seats Left"
                        variant="outlined"
                        fullWidth
                        placeholder="Max seats - 5"
                        value={seatsLeft}
                        type="number"
                        onChange={(e) => {
                            setSeatsLeft(e.target.value);
                        }}
                        style={{ marginBottom: 50 }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Session URL"
                        variant="outlined"
                        fullWidth
                        value={sessionUrl}
                        onChange={(e) => {
                            setSessionUrl(e.target.value);
                        }}
                        style={{ marginBottom: 50 }}
                    />
                </Container>
            </Dialog>
            <Footer headerUrl="session" />
        </div>
    );
};

export default Session;
