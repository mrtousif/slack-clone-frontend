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
// import { useQuery } from "@apollo/client";
// import UserProvider from "../contexts/UserProvider";
import InfoIcon from "@material-ui/icons/Info";
import StarIcon from "@material-ui/icons/StarOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Messages from "../components/Messages";
import SendMessage from "../components/SendMessage";
// import { useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        // padding: theme.spacing(3),
        display: "grid",
        height: "calc(100vh - 30px)",
        // gridTemplateColumns: "100px 250px 1fr",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr 5fr auto",
    },
    header: {
        // gridColumn: 3,
        // gridRow: 1,
        // gridArea: "header",
    },
    footer: {
        // gridArea: "footer",
        // position: "fixed",
        // bottom: 0,
        // // top: "auto",
        // // right: 0,
        // // maxHeight: "70vh",
        // // padding: "0.5em",
        // width: `100%`,
        // [theme.breakpoints.up("sm")]: {
        //     width: `calc(100% - ${theme.drawerWidth}px)`,
        // },
    },
}));

function ChannelTab(props) {
    const { channel } = props;
    const classes = useStyles();
    // const theme = useTheme();

    // if (loading) return <Loading />;

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <ChannelTabTopBar channel={channel} />
                <Divider />
            </div>

            <div style={{ overflowY: "auto" }}>
                <Messages channelId={channel.id} />
            </div>

            <div className={classes.footer}>
                <SendMessage channelName={channel.name} channelId={channel.id} />
            </div>
        </div>
    );
}

const ChannelTabTopBar = ({ channel }) => (
    <Grid container justify="space-between" style={{ padding: "1rem" }}>
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
