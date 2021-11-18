import React from "react";
import { Container, Grid } from "@mui/material";
import { useHistory } from "react-router";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";

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
                    <Grid item xs={6} sm={6} md={6}>
                        <div
                            className="footerOption"
                            style={{
                                backgroundColor:
                                    url === "courses" ? "black" : "transparent",
                                color: url === "courses" ? "#ffb901" : "black",
                            }}
                            onClick={() => handleRoute("/courses")}
                        >
                            <MenuBookIcon style={{ fontSize: 30 }} />
                            <div className="footerOptionText">Courses</div>
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
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
                </Grid>
            </Container>
        </div>
    );
};

export default Footer;
