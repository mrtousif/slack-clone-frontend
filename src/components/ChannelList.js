import React from "react";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Typography,
    IconButton,
    Collapse,
} from "@material-ui/core";
// import EditIcon from "@material-ui/icons/Edit";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Link from "./Link";
import AddChannelDialog from "./AddChannelDialog";
import { useRouteMatch } from "react-router-dom";
import UserProvider from "../contexts/UserProvider";

const useStyles = makeStyles((theme) => ({
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
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
        // opacity: 0.7,
        // "&:hover": {
        //     // opacity: 1,
        //     backgroundColor: theme.palette.secondary.dark,
        // },
    },

    color: {
        color: "rgb(201, 209, 217)",
    },
    height: {
        minHeight: "39px",
    },
    itemSelected: {
        "&:focus": {
            backgroundColor: theme.palette.primary.main,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white,
            },
        },
    },
}));

export default function ChannelList(props) {
    const { workspace, channels = [] } = props;
    const { user } = React.useContext(UserProvider.context);
    const {
        params: { workspaceId, channelId },
    } = useRouteMatch();

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [owner, setOwner] = React.useState(false);
    const [addChannelDialogOpen, setAddChannelDialogOpen] = React.useState(false);

    React.useEffect(() => {
        if (workspace) {
            setOwner(workspace.owner === user.id);
        }
    }, [user, workspace]);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickOpen = () => {
        setAddChannelDialogOpen(true);
    };

    const handleClose = (e) => {
        setAddChannelDialogOpen(false);
    };

    // console.log(path, url);

    return (
        <div>
            <List dense>
                <ListItem button onClick={handleClick}>
                    <ListItemIcon className={classes.color} style={{ minWidth: "1.5em" }}>
                        {open ? (
                            <ExpandLess color="inherit" />
                        ) : (
                            <ExpandMore color="inherit" />
                        )}
                    </ListItemIcon>
                    <ListItemText primary="Channels" />
                    {owner && (
                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={handleClickOpen}
                                size="small"
                                color="inherit"
                            >
                                <AddIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    )}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {channels.map((channel) => (
                            <ListItem
                                key={channel.id}
                                button
                                component={Link}
                                to={`/${workspaceId}/${channel.id}`}
                                className={classes.nested}
                                // classes={{
                                //     selected: classes.itemSelected,
                                // }}
                                // onClick={(e) => {
                                //     // setValue(e.target.value);
                                //     // console.log(item.id);
                                // }}
                                selected={channelId === channel.id}
                            >
                                <ListItemIcon
                                    className={classes.color}
                                    style={{ minWidth: "1.2em" }}
                                >
                                    <Typography color="inherit">#</Typography>
                                </ListItemIcon>
                                <ListItemText primary={channel.name} />
                            </ListItem>
                        ))}
                        {owner && (
                            <ListItem
                                button
                                className={classes.nested}
                                onClick={(e) => {
                                    handleClickOpen(e);
                                }}
                                // selected={value === i}
                            >
                                <ListItemIcon
                                    className={classes.color}
                                    style={{ minWidth: "1.2em" }}
                                >
                                    <Typography color="inherit">+</Typography>
                                </ListItemIcon>
                                <ListItemText primary="Add channels" />
                            </ListItem>
                        )}
                    </List>
                </Collapse>
            </List>

            <AddChannelDialog
                open={addChannelDialogOpen}
                setOpen={setAddChannelDialogOpen}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                workspace={workspace}
            />
        </div>
    );
}
