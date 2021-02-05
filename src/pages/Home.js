import React from "react";
import {
    // Container,
    Divider,
    Grid,
    Avatar,
    Typography,
    Button,
    IconButton,
    ButtonBase,
    // TextField,
} from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import Notification from "../components/Notification";
import { GET_WORKSPACE } from "../graphql/graphql";
import { useQuery } from "@apollo/client";
// import UserProvider from "../contexts/UserProvider";
import InfoIcon from "@material-ui/icons/Info";
import AppBar from "../components/AppBar";
// import ErrorBoundary from "../ErrorBoundary";
import SendMessage from "../components/SendMessage";
import Loading from "../components/Loading";

// const useStyles = makeStyles((theme) => ({
//     // content: {
//     //     flexGrow: 1,
//     //     padding: theme.spacing(3),
//     // },
// }));

function Home(props) {
    // const classes = useStyles();
    // console.log(props.hostData);

    // const [totalComments, setTotalComments] = useState(0);
    // const [sortBy, setSortBy] = useState(null);
    // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    // const sortComments = (key) => {
    //     switch (key) {
    //         case "likes":
    //             setSortBy("likes");
    //             break;
    //         case "newest":
    //             setSortBy("createdAt");
    //             break;

    //         default:
    //             break;
    //     }
    // };
    const { loading, error, data } = useQuery(GET_WORKSPACE, {
        // variables: {
        //     userId: userCtx.user._id,
        // },
    });

    if (loading) return <Loading />;
    if (error) return "Error:(";
    //totalComments={totalComments} sortComments={sortComments}
    // style={{ marginTop: "9rem" }}
    // direction="column"
    const { getWorkspace } = data;
    return (
        <AppBar workspaceData={getWorkspace}>
            {/* <div
                style={{
                    display: "grid",
                    height: "100vh",
                    gridTemplateColumns: "100px 250px 1fr",
                    gridTemplateRows: "auto 1fr auto",
                }}
            ></div> */}
            <Grid container justify="space-between" style={{ padding: "1rem" }}>
                <Grid item>
                    <Grid container direction="column">
                        <Typography
                            style={{ fontSize: "1em", fontWeight: "700" }}
                            color="initial"
                        >
                            #general
                        </Typography>
                        <Typography style={{ fontSize: "0.9em" }} color="textSecondary">
                            Add a topic
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                            <ButtonBase size="small">
                                <Avatar
                                    variant="rounded"
                                    style={{ height: "28px", width: "28px" }}
                                />
                            </ButtonBase>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ textTransform: "none" }}
                                size="small"
                            >
                                + Add
                            </Button>
                        </Grid>
                        <Grid item>
                            <IconButton>
                                <InfoIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />

            {/* <div> */}
            <SendMessage />
            {/* </div> */}
        </AppBar>
    );
}

export default Home;
