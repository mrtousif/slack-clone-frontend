import React from "react";
import {
    // Container,
    Divider,
    Grid,
    Typography,
    // IconButton,
    // FormControl,
    // Input,
    // InputAdornment,
    // TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Notification from "../components/Notification";
import UserSelect from "../components/UserSelect";

// import userProvider from "../contexts/UserProvider";

// import { useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        // padding: theme.spacing(3),
        display: "grid",
        // height: "calc(100vh - 30px)",
        // gridTemplateColumns: "100px 250px 1fr",
        // gridTemplateColumns: "1fr",
        // gridTemplateRows: "auto 1fr",
    },
    header: {
        // gridRow: 1,
    },
    content: {
        backgroundColor: "#f6f6f6",
        // gridRow: 2,
        // overflowY: "auto",
        // display: "flex",
        // flexDirection: "column-reverse",
        // padding: "1em",
    },
    footer: {
        // gridRow: 3,
        // position: "fixed",
        // bottom: 0,
        // top: "auto",
        // right: 0,
        // maxHeight: "70vh",
        // padding: "0.5em",
        // width: `100%`,
        // [theme.breakpoints.up("sm")]: {
        //     width: `calc(100% - ${theme.drawerWidth}px)`,
        // },
    },
    padding: { padding: theme.spacing(2) },
}));

function DMTab(props) {
    const { receiver } = props;
    const classes = useStyles();

    // if (loading) return <Loading />;

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <DMTabTopBar receiver={receiver} />
                <Divider />
                <UserSelect />
                <Divider />
            </div>

            <div className={classes.content}>
                <Content />
            </div>

            {/* <div className={classes.footer}></div> */}
        </div>
    );
}

const DMTabTopBar = () => (
    <Grid container style={{ padding: "1rem", paddingTop: "2.2em" }} alignItems="center">
        <Grid item>
            <Typography style={{ fontSize: "1.1em", fontWeight: "700" }} color="initial">
                All direct messages
            </Typography>
        </Grid>
    </Grid>
);

const Content = () => {
    // const classes = useStyles();
    // const {loading} = useQuery()
    return <div>{/* <Typography></Typography> */}</div>;
};

export default DMTab;
