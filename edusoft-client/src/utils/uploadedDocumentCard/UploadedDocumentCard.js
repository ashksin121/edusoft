import React from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import "./UploadedDocumentCard.css";

const UploadedDocumentCard = ({ cardTitle, fileData, onClick }) => {
    const handleClick = () => {
        onClick(fileData);
    };

    return (
        <div className="documentCard" onClick={handleClick}>
            <div>
                <InsertDriveFileIcon
                    style={{ fontSize: 40 }}
                    className="documentCardIcon"
                />
            </div>
            <div className="documentCardText">{cardTitle}</div>
        </div>
    );
};

export default UploadedDocumentCard;
