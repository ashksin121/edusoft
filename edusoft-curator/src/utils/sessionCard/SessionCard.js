import React from "react";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import moment from "moment";

import "./SessionCard.css";

const SessionCard = ({
    sessionName,
    influencerName,
    sessionDate,
    sessionStartTime,
    sessionEndTime,
    seatsLeft,
    sessionUrl,
}) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <div className="sessionCardTitle">{sessionName}</div>
                <div className="sessionCardInfluencer">- {influencerName}</div>
                <div className="sessionCardInfo">
                    <InsertInvitationIcon style={{ marginRight: 10 }} />
                    {moment.unix(sessionDate).format("DD/MM/YYYY")}
                </div>
                <div className="sessionCardInfo">
                    <AccessTimeFilledIcon style={{ marginRight: 10 }} />
                    {moment.unix(sessionStartTime).format("hh:mm A")} -{" "}
                    {moment.unix(sessionEndTime).format("hh:mm A")}
                </div>
                <div className="sessionCardFee">
                    <div>Fee</div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        50 <MonetizationOnIcon />{" "}
                    </div>
                </div>
                <div className="sessionCardSeats">
                    <div>Seats Left</div>
                    <div>{seatsLeft}</div>
                </div>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    variant="ceontained"
                    style={{
                        backgroundColor: "#7fba00",
                        fontWeight: "bold",
                        color: "white",
                        fontFamily: "Quicksand, sans-serif",
                    }}
                    onClick={() => {
                        window.open(sessionUrl);
                    }}
                >
                    Go To Session
                </Button>
            </CardActions>
        </Card>
    );
};

export default SessionCard;
