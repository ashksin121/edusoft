import React from "react";
import { Avatar, Container } from "@mui/material";
import { useHistory } from "react-router";

import "./Header.css";
import Logo from "../../assets/logo.png";
import UserLogo from "../../assets/userImage.jpg";

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
                        EduSoft
                    </div>
                    <div className="headerOptionsMain">
                        <div
                            className="headerOption"
                            style={{
                                backgroundColor:
                                    url === "learn" ? "black" : "transparent",
                                color: url === "learn" ? "#ffb901" : "black",
                            }}
                            onClick={() => handleRoute("/learn")}
                        >
                            Learn
                        </div>
                        <div
                            className="headerOption"
                            style={{
                                backgroundColor:
                                    url === "teach" ? "black" : "transparent",
                                color: url === "teach" ? "#ffb901" : "black",
                            }}
                            onClick={() => handleRoute("/teach")}
                        >
                            Teach
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
                            Sessions
                        </div>
                        <div
                            className="headerAvatar"
                            onClick={() => {
                                history.push("/profile");
                            }}
                        >
                            <Avatar
                                alt="user"
                                className="headerUser"
                                src={UserLogo}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Header;
