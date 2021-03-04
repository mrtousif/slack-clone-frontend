import React from "react";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Notification from "../components/Notification";
import { useMutation, useQuery } from "@apollo/client";
// import UserProvider from "../contexts/UserProvider";
import ChannelTabTopBar from "../components/ChannelTopBar";
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
        // padding: "1em",
    },
    footer: {
        gridRow: 3,
        paddingLeft: "1.3em",
        paddingRight: "1.3em",
        paddingBottom: "1.3em",
    },
}));

function ChannelTab(props) {
    const { channel } = props;
    const { channelId } = useParams();
    const classes = useStyles();
    const [filesToUpload, setFilesToUpload] = React.useState([]);
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

    if (error) console.error(error);

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

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <ChannelTabTopBar channel={channel} />
                <Divider />
            </div>

            <div className={classes.content}>
                {loading ? (
                    <Loading />
                ) : data?.getMessages ? (
                    <Messages
                        style={{
                            gridRow: 2,
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column-reverse",
                            padding: "1em",
                        }}
                        messages={data.getMessages}
                        subscribeForNewMessages={subscribeForNewMessages}
                        setFilesToUpload={setFilesToUpload}
                    />
                ) : null}
            </div>

            <div className={classes.footer}>
                <SendMessage
                    placeholder={channel.name}
                    channelId={channelId}
                    createMessage={createMessage}
                    filesToUpload={filesToUpload}
                    setFilesToUpload={setFilesToUpload}
                />
            </div>
        </div>
    );
}

export default ChannelTab;
