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
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from "@firebase/auth";

import "./LandingPage.css";
import Logo from "../../assets/logo.png";
import { logIn, signUp } from "../profile/profileSlice";

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
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        setIsLoading(true);
        if (email === "" || password === "") {
            toast.error("One or more missing data", {
                containerId: "toastMessage",
            });
            setIsLoading(false);
            return;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            toast.error("Invalid Data", {
                containerId: "toastMessage",
            });
            setIsLoading(false);
            return;
        }

        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(userCredential.user);
            dispatch(logIn(userCredential.user));
            history.push("/learn");
        } catch (e) {
            setIsLoading(false);
            console.log(e.code);
            if (e.code === "auth/user-not-found") {
                toast.error("Email not registered", {
                    containerId: "toastMessage",
                });
                setEmail("");
                setPassword("");
            } else if (e.code === "auth/wrong-password") {
                toast.error("Wrong passowrd", {
                    containerId: "toastMessage",
                });
                setPassword("");
            }
        }
    };

    const handleSignup = async () => {
        setIsLoading(true);
        if (email === "" || name === "" || password === "") {
            toast.error("One or more missing data", {
                containerId: "toastMessage",
            });
            setIsLoading(false);
            return;
        }
        if (
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
            !/^[A-Za-z ]+$/.test(name)
        ) {
            toast.error("Invalid Data", {
                containerId: "toastMessage",
            });
            setIsLoading(false);
            return;
        }

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const userData = {
                name: name,
                user: userCredential.user,
            };
            dispatch(signUp(userData));
            history.push("/learn");
        } catch (e) {
            setIsLoading(false);
            console.log(e.code);
            if (e.code === "auth/email-already-in-use") {
                toast.error("Email already in use", {
                    containerId: "toastMessage",
                });
                setEmail("");
            } else if (e.code === "auth/weak-password") {
                toast.error("Weak passowrd", {
                    containerId: "toastMessage",
                });
                setPassword("");
            }
        }
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
                                            color: "#f25022",
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
                                            style={{ color: "#f25022" }}
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
