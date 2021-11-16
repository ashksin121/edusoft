import React, { useState } from "react";
import {
    Button,
    CircularProgress,
    Container,
    Grid,
    Input,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { Chip, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";

import "./Dashboard.css";
import NoData from "../../utils/noData/NoData";
import UploadedDocumentCard from "../../utils/uploadedDocumentCard/UploadedDocumentCard";

const useStyles = makeStyles({
    searchInput: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Quicksand, sans-serif",
    },
    dialogStyles: {
        "& .MuiDialogTitle-root": {
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bolder",
            textAlign: "center",
            fontSize: 25,
        },
        "& .MuiDialogContentText-root": {
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
        },
        "& .MuiInputLabel-root": {
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
        },
        "& .MuiInput-root": {
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
        },
        "& .MuiButton-root": {
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
        },
    },
    divStyle: {
        "& .MuiButton-root": {
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
        },
    },
});

const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const Dashboard = () => {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false);
    const [allCourses, setAllCourses] = useState([""]);
    const [searchValue, setSearchValue] = useState([]);
    const [openAccept, setOpenAccept] = useState(false);
    const [openReject, setOpenReject] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [acceptPoints, setAcceptPoints] = useState("");
    const [rejectRemarks, setRejectRemarks] = useState("");

    const tags = [
        { key: 0, label: "Angular" },
        { key: 1, label: "jQuery" },
        { key: 2, label: "Polymer" },
        { key: 3, label: "React" },
        { key: 4, label: "Vue.js" },
    ];

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const handleClose = () => {
        setOpenReject(false);
        setOpenAccept(false);
        setAcceptPoints("");
        setRejectRemarks("");
    };

    const handleCourseAccept = () => {
        setIsUpdate(true);
        if (
            acceptPoints === "" ||
            parseInt(acceptPoints) < 1 ||
            parseInt(acceptPoints) > 10
        ) {
            toast.error("Invalid Points", {
                containerId: "toastMessage",
            });
            setIsUpdate(false);
            return;
        }
    };

    const handleCourseReject = () => {
        setIsUpdate(true);
        if (rejectRemarks === "") {
            toast.error("Invalid Comments", {
                containerId: "toastMessage",
            });
            setIsUpdate(false);
            return;
        }
    };

    return (
        <div style={{ width: "100%" }}>
            <Container style={{ marginTop: 50 }}>
                {isLoading ? (
                    <div
                        style={{
                            width: "100%",
                            marginTop: 50,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress style={{ color: "#00a4ef" }} />
                    </div>
                ) : allCourses.length === 0 ? (
                    <NoData fontColor="#00a4ef" />
                ) : (
                    <div className={classes.divStyle}>
                        <div className="searchDiv">
                            <div className="searchBar">
                                <SearchIcon
                                    className="searchIcon"
                                    style={{ fontSize: 30 }}
                                />
                                <Input
                                    className={classes.searchInput}
                                    value={searchValue}
                                    disableUnderline={true}
                                    placeholder="Search..."
                                    autoFocus
                                    onChange={handleSearch}
                                    fullWidth
                                />
                            </div>
                        </div>
                        <Accordion style={{ marginBottom: 50 }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <div className="cardTitle">Accordion 1</div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="cardDesc">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </div>
                                <Paper
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        listStyle: "none",
                                        padding: 0,
                                        backgroundColor: "transparent",
                                    }}
                                    component="ul"
                                    elevation={0}
                                    style={{ marginBottom: 20 }}
                                >
                                    {tags.map((data) => {
                                        return (
                                            <ListItem key={data.key}>
                                                <Chip label={data.label} />
                                            </ListItem>
                                        );
                                    })}
                                </Paper>
                                <Grid
                                    container
                                    spacing={2}
                                    style={{ marginBottom: 20 }}
                                >
                                    <Grid item xs={12} sm={6} md={3}>
                                        <UploadedDocumentCard
                                            cardTitle={`File 1`}
                                            fileData="NA"
                                            onClick={() => {}}
                                        />
                                    </Grid>
                                </Grid>
                                <div className="cardButtonBar">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <Button
                                                variant="contained"
                                                startIcon={<CheckCircleIcon />}
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: "#7fba00",
                                                }}
                                                onClick={() => {
                                                    setOpenAccept(true);
                                                }}
                                            >
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <Button
                                                variant="contained"
                                                startIcon={<CancelIcon />}
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: "#f25022",
                                                }}
                                                onClick={() => {
                                                    setOpenReject(true);
                                                }}
                                            >
                                                Reject
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                )}
            </Container>
            <Dialog
                open={openAccept}
                onClose={handleClose}
                className={classes.dialogStyles}
            >
                <DialogTitle>Accept Course</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Accept the course if you like the course contents
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Points for acceptance"
                        type="number"
                        fullWidth
                        variant="standard"
                        placeholder="Give points out of 10"
                        value={acceptPoints}
                        onChange={(e) => {
                            setAcceptPoints(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    {isUpdate ? (
                        <CircularProgress />
                    ) : (
                        <div>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button
                                onClick={handleCourseAccept}
                                style={{ color: "#7fba00" }}
                            >
                                Accept
                            </Button>
                        </div>
                    )}
                </DialogActions>
            </Dialog>
            <Dialog
                open={openReject}
                onClose={handleClose}
                className={classes.dialogStyles}
            >
                <DialogTitle>Reject Course</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Reject course if the course material is not appropriate
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Reason for rejection"
                        type="number"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={5}
                        value={rejectRemarks}
                        onChange={(e) => {
                            setRejectRemarks(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    {isUpdate ? (
                        <CircularProgress />
                    ) : (
                        <div>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button
                                onClick={handleCourseReject}
                                style={{ color: "#f25022" }}
                            >
                                Reject
                            </Button>
                        </div>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Dashboard;
