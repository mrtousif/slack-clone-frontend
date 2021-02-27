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
import { blue } from "@material-ui/core/colors";
import Link from "./Link";
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
    // theme.palette.getContrastText(blue[300])
    blue: {
        color: blue[800],
        backgroundColor: "#ddd",
    },
}));

export default function ListWithSubList(props) {
    const classes = useStyles();
    const { workspace, receivers = [] } = props;
    const { user } = React.useContext(UserProvider.context);
    const {
        params: { workspaceId, receiverId },
    } = useRouteMatch();
    const history = useHistory();

    const [open, setOpen] = React.useState(true);
    const [owner, setOwner] = React.useState(false);
    const [addTeammatesDialogOpen, setAddTeammatesDialogOpen] = React.useState(false);

    React.useEffect(() => {
        if (workspace) {
            setOwner(workspace.owner === user.id);
        }
    }, [user, workspace]);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickOpen = () => {
        setAddTeammatesDialogOpen(true);
    };

    const handleAddClickOpen = () => {
        history.push(`/${workspaceId}/all-dms`);
    };

    const handleClose = (e) => {
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
                    <ListItemText primary="Direct Messages" />
                    <ListItemSecondaryAction>
                        <IconButton
                            onClick={handleAddClickOpen}
                            size="small"
                            color="inherit"
                        >
                            <AddIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {receivers.map((receiver) => (
                            <ListItem
                                key={receiver.id}
                                button
                                component={Link}
                                to={`/${workspaceId}/dm/${receiver.id}`}
                                className={classes.nested}
                                // classes={{
                                //     selected: classes.itemSelected,
                                // }}
                                // onClick={(e) => {
                                //     // setValue(e.target.value);
                                //     // console.log(item.id);
                                // }}
                                selected={receiverId === receiver.id}
                            >
                                <ListItemIcon
                                    className={classes.color}
                                    style={{ minWidth: "1.2em" }}
                                >
                                    <Avatar
                                        variant="rounded"
                                        style={{
                                            width: "1em",
                                            height: "1em",
                                            marginRight: "0.6em",
                                        }}
                                        src={receiver.photo}
                                        // alt={receiver.name}
                                        className={classes.blue}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        receiver.id === user.id
                                            ? `${receiver.name} (you)`
                                            : receiver.name
                                    }
                                />
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
                                <ListItemText primary="Add teammates" />
                            </ListItem>
                        )}
                    </List>
                </Collapse>
            </List>

            <AddTeammates
                workspace={workspace}
                open={addTeammatesDialogOpen}
                setOpen={setAddTeammatesDialogOpen}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
            />
        </div>
    );
}
