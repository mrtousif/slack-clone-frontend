import React from "react";
import {
    // Container,
    Divider,
    Grid,
    Avatar,
    Typography,
    IconButton,
    ButtonBase,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Notification from "../components/Notification";
// import { GET_MESSAGES } from "../graphql/graphql";
import { useMutation, useQuery } from "@apollo/client";
// import UserProvider from "../contexts/UserProvider";
import InfoIcon from "@material-ui/icons/Info";
import StarIcon from "@material-ui/icons/StarOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Messages from "../components/Messages";
import SendMessage from "../components/SendMessage";
import { CREATE_MESSAGE, GET_MESSAGES, MESSAGE_SUBSCRIPTION } from "../graphql/graphql";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        // padding: theme.spacing(3),
        display: "grid",
        height: "calc(100vh - 30px)",
        // gridTemplateColumns: "100px 250px 1fr",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto 1fr auto",
    },
    header: {
        gridRow: 1,
    },
    content: {
        gridRow: 2,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        padding: "1em",
    },
    footer: {
        gridRow: 3,
    },
}));

function ChannelTab(props) {
    const { channel } = props;
    const { channelId } = useParams();
    const classes = useStyles();

    const { data, loading, subscribeToMore, error } = useQuery(GET_MESSAGES, {
        fetchPolicy: "network-only",
        variables: {
            channelId,
        },
    });
    const [createMessage] = useMutation(CREATE_MESSAGE, {
        onError(err) {
            return err;
        },
    });

    const subscribeForNewMessages = () =>
        subscribeToMore({
            document: MESSAGE_SUBSCRIPTION,
            variables: { channelId },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.newMessage;
                // console.log(prev);
                return {
                    ...prev,
                    getMessages: [newFeedItem, ...prev.getMessages],
                };
            },
        });

    if (error) console.error(error);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <ChannelTabTopBar channel={channel} />
                <Divider />
            </div>

            <div className={classes.content}>
                {loading ? (
                    <Loading />
                ) : (
                    <Messages
                        messages={data.getMessages}
                        subscribeForNewMessages={subscribeForNewMessages}
                    />
                )}
            </div>

            <div className={classes.footer}>
                <SendMessage
                    placeholder={channel.name}
                    channelId={channelId}
                    createMessage={createMessage}
                />
            </div>
        </div>
    );
}

const ChannelTabTopBar = ({ channel }) => (
    <Grid
        container
        alignItems="center"
        justify="space-between"
        style={{ padding: "1rem", paddingTop: "1.3rem" }}
    >
        <Grid item>
            <Grid container direction="column">
                <Grid item container alignItems="center" spacing={1}>
                    <Grid item>
                        <Typography
                            style={{ fontSize: "1em", fontWeight: "700" }}
                            color="initial"
                        >
                            {`#${channel.name}`}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton size="small">
                            <StarIcon style={{ fontSize: "inherit" }} />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography style={{ fontSize: "0.9em" }} color="textSecondary">
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
);

export default ChannelTab;
