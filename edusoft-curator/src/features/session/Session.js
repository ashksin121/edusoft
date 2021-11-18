import React, { useState } from "react";
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

import "./Session.css";
import Header from "../../utils/header/Header";
import NoData from "../../utils/noData/NoData";
import SessionCard from "../../utils/sessionCard/SessionCard";
import Footer from "../../utils/footer/Footer";

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

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleAddSession = () => {
        setIsAddingSession(true);
        console.log(sessionStartTime);
        let allCheck = true;
        if (
            sessionName === "" ||
            mentorName === "" ||
            sessionUrl === "" ||
            seatsLeft === "" ||
            parseInt(seatsLeft) > 50
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
    };

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
                                <Grid item xs={12} sm={6} md={4}>
                                    <SessionCard
                                        sessionName="Session Name"
                                        influencerName="Influencer Name"
                                        sessionDate="Today Date"
                                        sessionTime="Start Time - End Time"
                                        seatsLeft="XX"
                                        sessionUrl="https://microsoft.acehacker.com/fte2021/index.html"
                                    />
                                </Grid>
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
