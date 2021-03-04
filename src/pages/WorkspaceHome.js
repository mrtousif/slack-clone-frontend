import React from "react";
import { GET_USER_WORKSPACES } from "../graphql/graphql";
import { useQuery } from "@apollo/client";
import { useRouteMatch, useHistory } from "react-router-dom";
// import UserProvider from "../contexts/UserProvider";
import AppBar from "../components/TopBar";
import ErrorBoundary from "../ErrorBoundary";
import ChannelTab from "./ChannelTab";
import DMTab from "./DMTab";
import Loading from "../components/Loading";
import AllDMs from "./AllDMs";

// import { clone } from "rambda";

// const useStyles = makeStyles((theme) => ({
// content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
// },

export default function WorkspaceHome(props) {
    // const classes = useStyles();
    const {
        params: { channelId, workspaceId, receiverId },
        url,
    } = useRouteMatch();
    // const location = useLocation();
    const history = useHistory();

    const [currentWorkspace, setCurrentWorkspace] = React.useState({});
    const [currentChannel, setCurrentChannel] = React.useState({});

    const { loading, data } = useQuery(GET_USER_WORKSPACES);
    // const [getDMsOfUser, { loading: loading2, data: data2 }] = useLazyQuery({
    //     variables: { userId },
    // });
    // console.log("workspaces", workspaces, "receiver", receiver);

    React.useEffect(() => {
        if (data?.getUserWorkspaces) {
            const { getUserWorkspaces } = data;
            const workspace = getUserWorkspaces.filter(
                (workspace) => workspace.id === workspaceId
            );

            if (!workspace.length) history.push("/not-found");

            setCurrentWorkspace(workspace[0]);

            if (channelId) {
                // get current channel
                const channel = workspace[0].channels.filter(
                    (channel) => channel.id === channelId
                );
                // console.log(channel);
                setCurrentChannel(...channel);
            }
        }
    }, [data, channelId, workspaceId, history]);

    if (loading) return <Loading />;

    return data?.getUserWorkspaces ? (
        <AppBar workspaceData={currentWorkspace} workspaces={data.getUserWorkspaces}>
            <ErrorBoundary>
                {channelId && <ChannelTab channel={currentChannel} />}
                {receiverId && <DMTab receiver={{}} receiverId={receiverId} />}
                {url.includes("all-dms") && <AllDMs />}
            </ErrorBoundary>
        </AppBar>
    ) : null;
}
