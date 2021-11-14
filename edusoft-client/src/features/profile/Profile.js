import { Button, Container, Divider } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Header from "../../utils/header/Header";

import "./Profile.css";
import { logOut } from "./profileSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = async () => {
        try {
            await dispatch(logOut());
            history.push("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="appBody">
            <Header headerUrl="none" />
            <div style={{ width: "100%" }}>
                <Container style={{ marginTop: 50 }}>
                    <div className="pageHeading">USER NAME</div>
                    <Divider style={{ marginBottom: 30 }} />
                    <div className="profileCoinsCont">
                        <div className="profileCoinsTitle">Coins Earned</div>
                        <div className="profileCoinsValue">200</div>
                    </div>

                    <div className="pageSubHeading">Learner Achievement</div>
                    <Divider style={{ marginBottom: 30 }} />
                    <div
                        className="profileDataCont"
                        style={{ color: "#7fba00" }}
                    >
                        <div className="profileDataHeading">
                            Courses Completed
                        </div>
                        <div className="profileDataValue">200</div>
                    </div>
                    <div
                        className="profileDataCont"
                        style={{ color: "#ffb901" }}
                    >
                        <div className="profileDataHeading">
                            Courses Pending
                        </div>
                        <div className="profileDataValue">200</div>
                    </div>

                    <div className="pageSubHeading">Teacher Achievement</div>
                    <Divider style={{ marginBottom: 30 }} />
                    <div
                        className="profileDataCont"
                        style={{ color: "#00a4ef" }}
                    >
                        <div className="profileDataHeading">
                            Courses Uploaded
                        </div>
                        <div className="profileDataValue">200</div>
                    </div>
                    <div
                        className="profileDataCont"
                        style={{ color: "#7fba00" }}
                    >
                        <div className="profileDataHeading">
                            Courses Accepted
                        </div>
                        <div className="profileDataValue">200</div>
                    </div>
                    <div
                        className="profileDataCont"
                        style={{ color: "#f25022" }}
                    >
                        <div className="profileDataHeading">
                            Courses Rejected
                        </div>
                        <div className="profileDataValue">200</div>
                    </div>
                    <div className="profileButtonCont">
                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#f25022" }}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Profile;
