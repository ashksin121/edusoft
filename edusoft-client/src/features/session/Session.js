import React, { useState } from "react";
import { CircularProgress, Container, Divider, Grid } from "@mui/material";

import "./Session.css";
import Header from "../../utils/header/Header";
import NoData from "../../utils/noData/NoData";
import SessionCard from "../../utils/sessionCard/SessionCard";
import Footer from "../../utils/footer/Footer";

const Session = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [sessions, setSessions] = useState([""]);

    return (
        <div className="appBody">
            <Header headerUrl="session" />
            <div className="appContents">
                <Container style={{ marginTop: 50 }}>
                    <div className="pageHeading">
                        <div>Sessions</div>
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
            <Footer headerUrl="session" />
        </div>
    );
};

export default Session;
