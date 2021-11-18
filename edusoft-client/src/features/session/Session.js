import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Divider, Grid } from "@mui/material";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import "./Session.css";
import Header from "../../utils/header/Header";
import NoData from "../../utils/noData/NoData";
import SessionCard from "../../utils/sessionCard/SessionCard";
import Footer from "../../utils/footer/Footer";
import { db } from "../../firebase";
import { logIn } from "../profile/profileSlice";

const Session = () => {
    const dispatch = useDispatch();

    const sessionsBooked = useSelector((state) => state.profile.sessionsBooked);
    const profileLoading = useSelector((state) => state.profile.isLoading);
    const userId = useSelector((state) => state.profile.userId);

    const [isLoading, setIsLoading] = useState(false);
    const [bookedSessions, setBookedSessions] = useState([]);
    const [upcomingSessions, setUpcomingSessions] = useState([]);
    const [isReload, setIsReload] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "sessions"));
            let bookedSessions = [];
            let upcomingSessions = [];
            querySnapshot.forEach((doc) => {
                let sessionData = doc.data();
                sessionData.sessionId = doc.id;
                let utc = sessionData.sessionDate.seconds;
                let d = new Date(0);
                d.setUTCSeconds(utc);
                if (
                    moment(d).isAfter(new Date(), "day") ||
                    moment(d).isSame(new Date(), "day")
                ) {
                    if (sessionsBooked.includes(doc.id)) {
                        bookedSessions.push(sessionData);
                    } else {
                        upcomingSessions.push(sessionData);
                    }
                }
            });
            setBookedSessions(bookedSessions);
            setUpcomingSessions(upcomingSessions);
        };

        setIsLoading(true);
        fetchData();
        setIsLoading(false);
    }, [setIsLoading, isReload, sessionsBooked]);

    const handleBookSession = (sessionId) => {
        let newBookings = [...sessionsBooked];
        newBookings.push(sessionId);
        const uid = userId;
        const docRef = doc(db, "users", uid);
        setDoc(docRef, { sessionsBooked: newBookings }, { merge: true });
        dispatch(logIn(uid));
        setIsReload(!isReload);
    };

    return (
        <div className="appBody">
            <Header headerUrl="session" />
            <div className="appContents">
                <Container style={{ marginTop: 50 }}>
                    {isLoading && profileLoading ? (
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
                    ) : (
                        <div style={{ width: "100%" }}>
                            <div className="pageHeading">
                                <div>Booked Sessions</div>
                            </div>
                            <Divider style={{ marginBottom: 30 }} />
                            <Grid container spacing={2}>
                                {bookedSessions.length === 0 ? (
                                    <NoData fontColor="#00a4ef" />
                                ) : (
                                    bookedSessions.map((session) => (
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
                                                userId={userId}
                                                isBooking={false}
                                                handleClick={() => {
                                                    window.open(
                                                        session.sessionUrl
                                                    );
                                                }}
                                            />
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                            <div
                                className="pageHeading"
                                style={{ marginTop: 50 }}
                            >
                                <div>Upcoming Sessions</div>
                            </div>
                            <Divider style={{ marginBottom: 30 }} />
                            <Grid
                                container
                                spacing={2}
                                style={{ marginBottom: 20 }}
                            >
                                {upcomingSessions.length === 0 ? (
                                    <NoData fontColor="#00a4ef" />
                                ) : (
                                    upcomingSessions.map((session) => (
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
                                                userId={userId}
                                                isBooking={true}
                                                handleClick={() => {
                                                    handleBookSession(
                                                        session.sessionId
                                                    );
                                                }}
                                            />
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                        </div>
                    )}
                </Container>
            </div>
            <Footer headerUrl="session" />
        </div>
    );
};

export default Session;
