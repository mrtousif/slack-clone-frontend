import React from "react";
import {
    // List,
    // ListItem,
    // ListItemIcon,
    // ListItemText,
    Grid,
    Divider,
    Typography,
    IconButton,
    // Collapse,
    ButtonBase,
} from "@material-ui/core";
import MessageIcon from "@material-ui/icons/Message";
// import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
// import StarBorder from "@material-ui/icons/StarBorder";
import { makeStyles } from "@material-ui/core/styles";
import ListWithSubList from "./ListWithSubList";

// const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: theme.drawerWidth,
            flexShrink: 0,
        },
    },

    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: theme.drawerWidth,
        backgroundColor: theme.palette.secondary.main,
        color: "rgb(201, 209, 217)",
    },
    grow: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        // paddingTop: theme.spacing(3),
    },

    nested: {
        paddingLeft: theme.spacing(4),
    },
    // sectionDesktop: {
    // display: "none",
    // [theme.breakpoints.up("md")]: {
    //     display: "flex",
    // },
    // },
    // sectionMobile: {
    //     display: "flex",
    //     [theme.breakpoints.up("md")]: {
    //         display: "none",
    //     },
    // },
    color: {
        color: "rgb(201, 209, 217)",
    },
    height: {
        minHeight: "39px",
    },
}));

export default function SideBar(props) {
    const { workspaceData } = props;

    const classes = useStyles();
    // console.log(workspaceData);

    return (
        <div>
            <div className={classes.toolbar}>
                <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    style={{
                        paddingLeft: "1em",
                        paddingTop: "1em",
                    }}
                >
                    <Grid item>
                        <Grid container>
                            <Grid item>
                                <ButtonBase disableRipple style={{ color: "#fff" }}>
                                    <Typography>{workspaceData.name}</Typography>
                                    <ExpandMore color="inherit" />
                                </ButtonBase>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {/* onClick={} */}
                        <IconButton color="inherit" aria-label="edit">
                            <MessageIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
            <Divider />
            <ListWithSubList name="Channels" subList={workspaceData.channels} />
            <Divider />
            <ListWithSubList name="Direct Messages" subList={workspaceData.messages} />
            <Divider />
            <ListWithSubList name="Apps" subList={workspaceData.apps} />
            <Divider />
            {/* <Divider /> */}
            {/* <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List> */}
        </div>
    );
}
