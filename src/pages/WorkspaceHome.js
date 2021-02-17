import React from "react";

import { GET_WORKSPACES } from "../graphql/graphql";
import { useQuery } from "@apollo/client";
// import UserProvider from "../contexts/UserProvider";
// import InfoIcon from "@material-ui/icons/Info";
import AppBar from "../components/TopBar";
import ErrorBoundary from "../ErrorBoundary";
import ChannelTab from "./ChannelTab";
import Loading from "../components/Loading";
import { useRouteMatch } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
// content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
// },
// }));

export default function WorkspaceHome(props) {
    // const classes = useStyles();
    const {
        params: { channelId },
    } = useRouteMatch();
    // console.log(props);
    const [workspaces, setWorkspaces] = React.useState([]);
    const [currentWorkspace, setCurrentWorkspace] = React.useState({});
    const [currentChannel, setCurrentChannel] = React.useState({});

    const { loading, data = {} } = useQuery(GET_WORKSPACES);

    React.useEffect(() => {
        if (data.getWorkspacesAsMember || data.getWorkspacesAsOwner) {
            const { getWorkspacesAsMember, getWorkspacesAsOwner } = data;
            const combinedData = [...getWorkspacesAsMember, ...getWorkspacesAsOwner];
            // console.log(combinedData);
            setWorkspaces(combinedData);
            setCurrentWorkspace(combinedData[0]);

            if (channelId) {
                const channel = combinedData[0].channels.filter(
                    (channel) => channel.id === channelId
                );
                // console.log(channel);
                setCurrentChannel(...channel);
            }
        }
    }, [data, channelId]);

    if (loading) return <Loading />;
    // (
    //     workspaces.length > 0 &&
    return (
        <AppBar workspaceData={currentWorkspace} workspaces={workspaces}>
            {/* <div
                style={{
                    display: "grid",
                    height: "100vh",
                    gridTemplateColumns: "100px 250px 1fr",
                    gridTemplateRows: "auto 1fr auto",
                    display: grid;
                    grid-template-rows: auto;
                    overflow: hidden;
                    position: relative;
                }}
            ></div> */}
            <ErrorBoundary>
                <ChannelTab channel={currentChannel} />
            </ErrorBoundary>
        </AppBar>
    );
}
