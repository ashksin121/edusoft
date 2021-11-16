import React from "react";
import { Container } from "@mui/material";
import { useHistory } from "react-router";

import "./Header.css";
import Logo from "../../assets/logo.png";

const Header = () => {
    let history = useHistory();

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
                    <div className="headerOptionsMain"></div>
                </div>
            </Container>
        </div>
    );
};

export default Header;
