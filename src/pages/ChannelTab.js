import React from "react";
import {
    // Container,
    Divider,
    Grid,
    Avatar,
    Typography,
    IconButton,
    ButtonBase,
    // TextField,
} from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import Notification from "../components/Notification";
import { GET_CHANNEL } from "../graphql/graphql";
import { useQuery } from "@apollo/client";
// import UserProvider from "../contexts/UserProvider";
import InfoIcon from "@material-ui/icons/Info";
import StarIcon from "@material-ui/icons/StarOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
// import AppBar from "../components/AppBar";
// import ErrorBoundary from "../ErrorBoundary";
import SendMessage from "../components/SendMessage";
import Loading from "../components/Loading";
import { useRouteMatch } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//     // content: {
//     //     flexGrow: 1,
//     //     padding: theme.spacing(3),
//     // },
// }));

function ChannelTab(props) {
    // const classes = useStyles();
    const { channelId: firstChannelId } = props;

    // console.log(channelId);
    // const [totalComments, setTotalComments] = useState(0);
    // const [sortBy, setSortBy] = useState(null);
    // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const {
        params: { channelId },
    } = useRouteMatch();

    const { loading, data } = useQuery(GET_CHANNEL, {
        variables: {
            channelId: channelId ? channelId : firstChannelId,
        },
    });

    if (loading) return <Loading />;
    //totalComments={totalComments} sortComments={sortComments}
    // style={{ marginTop: "9rem" }}
    // direction="column"

    return data ? (
        <div>
            <Grid container justify="space-between" style={{ padding: "1rem" }}>
                <Grid item>
                    <Grid container direction="column">
                        <Grid item container alignItems="center" spacing={1}>
                            <Grid item>
                                <Typography
                                    style={{ fontSize: "1em", fontWeight: "700" }}
                                    color="initial"
                                >
                                    {`#${data.getChannel.name}`}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton size="small">
                                    <StarIcon style={{ fontSize: "inherit" }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography
                                style={{ fontSize: "0.9em" }}
                                color="textSecondary"
                            >
                                Add a topic
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                            <ButtonBase size="small">
                                <Avatar
                                    variant="rounded"
                                    style={{ height: "28px", width: "28px" }}
                                />
                            </ButtonBase>
                        </Grid>
                        <Grid item>
                            <IconButton color="primary">
                                <PersonAddIcon />
                            </IconButton>
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

            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    top: "auto",
                    padding: "0.5em",
                    width: "70vw",
                }}
            >
                <SendMessage channel={data.getChannel} />
            </div>
        </div>
    ) : (
        "ERROR"
    );
}

export default ChannelTab;
