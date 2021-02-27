import React from "react";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    // Grid,
    // Divider,
    Typography,
    IconButton,
    Collapse,
    // ButtonBase,
    Avatar,
} from "@material-ui/core";
// import EditIcon from "@material-ui/icons/Edit";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Link from "./Link";
import AddChannelDialog from "./AddChannelDialog";
import AddTeammates from "./AddTeammate";
import { useRouteMatch, useHistory } from "react-router-dom";
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

export default function ListWithSubList(props) {
    const { workspace, name, subList = [] } = props;
    const { user } = React.useContext(UserProvider.context);
    const {
        params: { workspaceId, channelId },
    } = useRouteMatch();
    const history = useHistory();

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [owner, setOwner] = React.useState(false);
    React.useEffect(() => {
        if (workspace) {
            setOwner(workspace.owner === user.id);
        }
    }, [user, workspace]);

    const handleClick = () => {
        setOpen(!open);
    };
    const [addChannelDialogOpen, setAddChannelDialogOpen] = React.useState(false);
    const [addTeammatesDialogOpen, setAddTeammatesDialogOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (name.includes("Channel")) {
            setAddChannelDialogOpen(true);
        } else if (name.includes("Direct")) {
            setAddTeammatesDialogOpen(true);
        }
    };

    const handleAddClickOpen = () => {
        if (name.includes("Channel")) {
            setAddChannelDialogOpen(true);
        } else if (name.includes("Direct")) {
            history.push(`/${workspaceId}/all-dms`);
        }
    };

    const handleClose = (e) => {
        setAddChannelDialogOpen(false);
        setAddTeammatesDialogOpen(false);
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
                    <ListItemText primary={name} />
                    {owner && (
                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={handleAddClickOpen}
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
                        {subList.map((item, i) => (
                            <ListItem
                                key={i}
                                button
                                component={Link}
                                to={`/${workspaceId}/${item.id}`}
                                className={classes.nested}
                                // classes={{
                                //     selected: classes.itemSelected,
                                // }}
                                // onClick={(e) => {
                                //     // setValue(e.target.value);
                                //     // console.log(item.id);
                                // }}
                                selected={channelId === item.id}
                            >
                                <ListItemIcon
                                    className={classes.color}
                                    style={{ minWidth: "1.2em" }}
                                >
                                    {name === "Direct Messages" ? (
                                        <Avatar
                                            variant="rounded"
                                            style={{
                                                width: "1em",
                                                height: "1em",
                                                marginRight: "0.6em",
                                            }}
                                        />
                                    ) : (
                                        <Typography color="inherit">#</Typography>
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
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
                                <ListItemText
                                    primary={
                                        name === "Channels"
                                            ? "Add channel"
                                            : name === "Direct messages"
                                            ? "Add teammates"
                                            : name === "Apps"
                                            ? "Add apps"
                                            : "Add"
                                    }
                                />
                            </ListItem>
                        )}
                    </List>
                </Collapse>
            </List>
            {name.includes("Channels") ? (
                <AddChannelDialog
                    open={addChannelDialogOpen}
                    setOpen={setAddChannelDialogOpen}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    workspace={workspace}
                />
            ) : name.includes("Direct") ? (
                <AddTeammates
                    workspace={workspace}
                    open={addTeammatesDialogOpen}
                    setOpen={setAddTeammatesDialogOpen}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                />
            ) : null}
        </div>
    );
}
