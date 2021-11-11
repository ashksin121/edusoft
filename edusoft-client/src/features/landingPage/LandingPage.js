import React, { useState } from "react";
import {
    CircularProgress,
    Container,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import "./LandingPage.css";
import Logo from "../../assets/logo.png";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        minWidth: 250,
        marginBottom: 50,
        width: "100%",
        "& .MuiInput-underline:after": {
            borderBottom: "2px solid #8D8D8D",
        },
        fontFamily: "Quicksand, sans-serif",
    },
    formDiv: {
        "& .MuiInput-underline:after": {
            borderBottom: "2px solid #8D8D8D",
        },
        "& .MuiInput-underline:hover": {
            borderBottom: "0px solid #8D8D8D",
        },
        "& .MuiFormLabel-root": {
            color: "#8D8D8D",
            fontSize: "16px",
            lineHeight: "21px",
            marginLeft: "-13px",
        },
        fontFamily: "Quicksand, sans-serif",
    },
});

const LandingPage = () => {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        setIsLoading(true);
    };

    const handleSignup = () => {
        setIsLoading(true);
    };

    const handleSwitch = () => {
        setIsLoading(false);
        setIsSignup(!isSignup);
    };

    return (
        <div style={{ width: "100%" }}>
            <div className="landingBaseDiv">
                <div className="landingOverlay">
                    <Container style={{ height: "100%" }}>
                        <div className="loginCont">
                            <div style={{ float: "left", width: "50%" }}>
                                <div className="loginInfoHeading">
                                    <img
                                        src={Logo}
                                        alt="Logo"
                                        className="AppLogo"
                                    />
                                    EduSoft
                                </div>
                                <div className="loginInfoContent">
                                    The peer-to-peer learning platform
                                </div>
                            </div>
                            <div className="loginCard">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginBottom: "30px",
                                    }}
                                >
                                    <LockIcon
                                        style={{
                                            color: "#f24f1c",
                                            fontSize: "40px",
                                        }}
                                    />
                                </div>
                                <form className={classes.formDiv}>
                                    {isSignup ? (
                                        <FormControl
                                            className={classes.textField}
                                            style={{ marginBottom: "40px" }}
                                        >
                                            <InputLabel
                                                htmlFor="standard-adornment-email"
                                                style={{
                                                    color: "#8D8D8D",
                                                    fontFamily:
                                                        "Quicksand, sans-serif",
                                                }}
                                            >
                                                Full Name
                                            </InputLabel>
                                            <Input
                                                id="standard-adornment-email"
                                                fullWidth
                                                label="Full Name"
                                                type="text"
                                                value={name}
                                                onChange={(event) => {
                                                    setName(event.target.value);
                                                }}
                                                style={{
                                                    fontWeight: "bold",
                                                    marginColor: "#8D8D8D",
                                                    fontFamily:
                                                        "Quicksand, sans-serif",
                                                }}
                                            />
                                        </FormControl>
                                    ) : null}
                                    <FormControl
                                        className={classes.textField}
                                        style={{ marginBottom: "40px" }}
                                    >
                                        <InputLabel
                                            htmlFor="standard-adornment-email"
                                            style={{
                                                color: "#8D8D8D",
                                                fontFamily:
                                                    "Quicksand, sans-serif",
                                            }}
                                        >
                                            Email ID
                                        </InputLabel>
                                        <Input
                                            id="standard-adornment-email"
                                            fullWidth
                                            label="Email ID"
                                            type="email"
                                            value={email}
                                            onChange={(event) => {
                                                setEmail(event.target.value);
                                            }}
                                            style={{
                                                fontWeight: "bold",
                                                marginColor: "#8D8D8D",
                                                fontFamily:
                                                    "Quicksand, sans-serif",
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl
                                        className={classes.textField}
                                        style={{ marginBottom: "40px" }}
                                    >
                                        <InputLabel
                                            htmlFor="standard-adornment-password"
                                            style={{
                                                color: "#8D8D8D",
                                                fontFamily:
                                                    "Quicksand, sans-serif",
                                            }}
                                        >
                                            Password
                                        </InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            label="Password"
                                            fullWidth
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={password}
                                            onChange={(event) => {
                                                setPassword(event.target.value);
                                            }}
                                            style={{
                                                fontWeight: "bold",
                                                marginColor: "#8D8D8D",
                                                fontFamily:
                                                    "Quicksand, sans-serif",
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityIcon />
                                                        ) : (
                                                            <VisibilityOffIcon />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </form>
                                {isLoading ? (
                                    <div className="loginCircularProgress">
                                        <CircularProgress
                                            style={{ color: "#EA4D23" }}
                                        />
                                    </div>
                                ) : isSignup ? (
                                    <div
                                        className="loginButton"
                                        onClick={handleSignup}
                                    >
                                        <div>Sign Up</div>
                                    </div>
                                ) : (
                                    <div
                                        className="loginButton"
                                        onClick={handleLogin}
                                    >
                                        <div>Login</div>
                                    </div>
                                )}
                                {isSignup ? (
                                    <div>
                                        <div className="loginBottomInfo">
                                            <div>Already have an account?</div>
                                        </div>
                                        <div
                                            className="loginSignUp"
                                            onClick={handleSwitch}
                                        >
                                            <div>Login</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="loginBottomInfo">
                                            <div>
                                                If you don't have an account?
                                            </div>
                                        </div>
                                        <div
                                            className="loginSignUp"
                                            onClick={handleSwitch}
                                        >
                                            <div>Sign Up</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
