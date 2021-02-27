import React from "react";
import {
    // Container,
    Divider,
    Grid,
    Typography,
    // IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Notification from "../components/Notification";
import {
    CREATE_DIRECT_MESSAGE,
    GET_DIRECT_MESSAGES,
    DIRECT_MESSAGE_SUBSCRIPTION,
} from "../graphql/graphql";
import { useMutation, useQuery } from "@apollo/client";
// import userProvider from "../contexts/UserProvider";
import Messages from "../components/Messages";
import SendMessage from "../components/SendMessage";
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

function DMTab(props) {
    // const location = useLocation();
    const { receiverId, workspaceId } = useParams();
    const classes = useStyles();

    const { loading, data, subscribeToMore } = useQuery(GET_DIRECT_MESSAGES, {
        fetchPolicy: "network-only",
        variables: { receiverId, workspaceId },
    });
    const [createDirectMessage] = useMutation(CREATE_DIRECT_MESSAGE, {
        onError(err) {
            return err;
        },
    });
    //console.log(data);
    // React.useEffect(() => {
    //     if (location?.state) {
    //         setUser(location.state.receiver);
    //     } else {
    //     }
    // }, [location]);

    const subscribeForNewDirectMessages = () =>
        subscribeToMore({
            document: DIRECT_MESSAGE_SUBSCRIPTION,
            variables: { receiverId, workspaceId },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.newDirectMessage;
                // console.log(newFeedItem);
                return {
                    ...prev,
                    getDirectMessages: [newFeedItem, ...prev.getDirectMessages],
                };
            },
        });

    return loading ? (
        <Loading />
    ) : (
        <div className={classes.root}>
            <div className={classes.header}>
                <DMTabTopBar receiver={{}} />
                <Divider />
            </div>

            <div className={classes.content}>
                <Messages
                    messages={data.getDirectMessages}
                    subscribeForNewMessages={subscribeForNewDirectMessages}
                />
            </div>

            <div className={classes.footer}>
                <SendMessage
                    placeholder={""}
                    receiverId={receiverId}
                    workspaceId={workspaceId}
                    createMessage={createDirectMessage}
                />
            </div>
        </div>
    );
}

const DMTabTopBar = ({ receiver }) => (
    <Grid
        container
        alignItems="center"
        // justify="space-between"
        style={{ padding: "1rem", paddingTop: "1.3rem" }}
    >
        <Grid item>
            <Typography style={{ fontSize: "1em", fontWeight: "700" }} color="initial">
                {receiver.name}
            </Typography>
        </Grid>
    </Grid>
);

export default DMTab;
