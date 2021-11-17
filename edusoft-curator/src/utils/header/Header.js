import React from "react";
import { Container } from "@mui/material";
import { useHistory } from "react-router";

import "./Header.css";
import Logo from "../../assets/logo.png";

const Header = ({ headerUrl }) => {
    let url = headerUrl;
    let history = useHistory();

    const handleRoute = (newUrl) => {
        url = newUrl;
        history.push(newUrl);
    };

    return (
        <div className="headerMain">
            <Container style={{ height: "80px" }}>
                <div className="headerCont">
                    <div
                        className="headerLogo"
                        onClick={() => {
                            history.push("/");
                        }}
                    >
                        <img src={Logo} alt="Logo" className="AppLogoHeader" />
                        EduSoft{" "}
                        <span className="appLogoHeaderAux">- Curator</span>
                    </div>
                    <div className="headerOptionsMain">
                        <div
                            className="headerOption"
                            style={{
                                backgroundColor:
                                    url === "courses" ? "black" : "transparent",
                                color: url === "courses" ? "#ffb901" : "black",
                            }}
                            onClick={() => handleRoute("/courses")}
                        >
                            Courses
                        </div>
                        <div
                            className="headerOption"
                            style={{
                                backgroundColor:
                                    url === "session" ? "black" : "transparent",
                                color: url === "session" ? "#ffb901" : "black",
                            }}
                            onClick={() => handleRoute("/session")}
                        >
                            Session
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Header;
