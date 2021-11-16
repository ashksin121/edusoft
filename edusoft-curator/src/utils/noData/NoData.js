import React from "react";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";

import "./NoData.css";

const NoData = ({ fontColor }) => {
    return (
        <div className="noDataMain">
            <RunningWithErrorsIcon
                style={{ fontSize: 100, color: fontColor }}
            />
            <div className="noDataText">Oh snap! No data found.</div>
        </div>
    );
};

export default NoData;
