import React from "react";
// import {
// Container,
// Divider,
// Grid,
// Avatar,
// Typography,
// Button,
// IconButton,
// ButtonBase,
// TextField,
// } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import Notification from "../components/Notification";
import { GET_WORKSPACES } from "../graphql/graphql";
import { useQuery } from "@apollo/client";
// import UserProvider from "../contexts/UserProvider";
// import InfoIcon from "@material-ui/icons/Info";
import AppBar from "../components/AppBar";
import ErrorBoundary from "../ErrorBoundary";
import ChannelTab from "./ChannelTab";
import Loading from "../components/Loading";
// import { useRouteMatch } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
// content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
// },
// }));

export default function WorkspaceHome(props) {
    // const classes = useStyles();
    // const {
    //     params: { workspaceId },
    // } = useRouteMatch();

    const { loading, data = {} } = useQuery(GET_WORKSPACES, {
        // variables: {
        //     id: workspaceId,
        // },
    });
    let workspaces = [];

    if (data.getWorkspacesByMember || data.getWorkspacesByOwner) {
        // console.log(data);
        const { getWorkspacesByMember, getWorkspacesByOwner } = data;

        workspaces = [...getWorkspacesByMember, ...getWorkspacesByOwner];
        console.log(workspaces);
    }

    // console.log("WorkspaceHome", data);
    if (loading) return <Loading />;

    return (
        workspaces.length > 0 && (
            <AppBar
                workspaceData={workspaces[0]}
                // workspaces={data.getWorkspaces}
            >
                {/* <div
                style={{
                    display: "grid",
                    height: "100vh",
                    gridTemplateColumns: "100px 250px 1fr",
                    gridTemplateRows: "auto 1fr auto",
                }}
            ></div> */}
                <ErrorBoundary>
                    <ChannelTab channelId={workspaces[0].channels[0].id} />
                </ErrorBoundary>
            </AppBar>
        )
    );
}
