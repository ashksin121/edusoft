import React from "react";
import { Container, Grid } from "@mui/material";
import { useHistory } from "react-router";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "./Footer.css";

const Footer = ({ headerUrl }) => {
    let url = headerUrl;
    let history = useHistory();

    const handleRoute = (newUrl) => {
        url = newUrl;
        history.push(newUrl);
    };

    return (
        <div className="footerMain">
            <Container style={{ height: 80 }}>
                <Grid container>
                    <Grid item xs={3} sm={3} md={3}>
                        <div
                            className="footerOption"
                            style={{
                                backgroundColor:
                                    url === "learn" ? "black" : "transparent",
                                color: url === "learn" ? "#ffb901" : "black",
                            }}
                            onClick={() => handleRoute("/learn")}
                        >
                            <MenuBookIcon style={{ fontSize: 30 }} />
                            <div className="footerOptionText">Learn</div>
                        </div>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                        <div
                            className="footerOption"
                            style={{
                                backgroundColor:
                                    url === "teach" ? "black" : "transparent",
                                color: url === "teach" ? "#ffb901" : "black",
                            }}
                            onClick={() => handleRoute("/teach")}
                        >
                            <SchoolIcon style={{ fontSize: 30 }} />
                            <div className="footerOptionText">Teach</div>
                        </div>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                        <div
                            className="footerOption"
                            style={{
                                backgroundColor:
                                    url === "session" ? "black" : "transparent",
                                color: url === "session" ? "#ffb901" : "black",
                            }}
                            onClick={() => handleRoute("/session")}
                        >
                            <LaptopChromebookIcon style={{ fontSize: 30 }} />
                            <div className="footerOptionText">Session</div>
                        </div>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                        <div
                            className="footerOption"
                            style={{
                                backgroundColor:
                                    url === "profile" ? "black" : "transparent",
                                color: url === "profile" ? "#ffb901" : "black",
                            }}
                            onClick={() => handleRoute("/profile")}
                        >
                            <AccountCircleIcon style={{ fontSize: 30 }} />
                            <div className="footerOptionText">Profile</div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Footer;
