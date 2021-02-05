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

const useStyles = makeStyles((theme) => ({
    // root: {
    //     display: "flex",
    // },
    // drawer: {
    //     [theme.breakpoints.up("sm")]: {
    //         width: drawerWidth,
    //         flexShrink: 0,
    //     },
    // },

    // menuButton: {
    //     marginRight: theme.spacing(2),
    //     [theme.breakpoints.up("sm")]: {
    //         display: "none",
    //     },
    // },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    // necessary for content to be below app bar
    // toolbar: theme.mixins.toolbar,
    // drawerPaper: {
    //     width: drawerWidth,
    //     backgroundColor: theme.palette.secondary.main,
    //     color: "rgb(201, 209, 217)",
    // },
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
}));

export default function ListWithSubList(props) {
    const { name, subList = [] } = props;
    const classes = useStyles();
    // const [value, setValue] = React.useState(10);
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

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
                    <ListItemSecondaryAction>
                        <IconButton
                            onClick={handleClickOpen}
                            size="small"
                            color="inherit"
                        >
                            <AddIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                        {subList.map((item, i) => (
                            <ListItem
                                key={i}
                                button
                                component={Link}
                                to={`/${item.id}`}
                                className={classes.nested}
                                onClick={(e) => {
                                    // setValue(e.target.value);
                                }}
                                // selected={value === i}
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
                        <ListItem
                            button
                            className={classes.nested}
                            onClick={(e) => {
                                // setValue(e.target.value);
                                handleClickOpen();
                            }}
                            // selected={value === i}
                        >
                            <ListItemIcon
                                className={classes.color}
                                style={{ minWidth: "1.2em" }}
                            >
                                <Typography color="inherit">+</Typography>
                            </ListItemIcon>
                            <ListItemText primary="Add" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            <AddChannelDialog
                dialogOpen={dialogOpen}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
            />
        </div>
    );
}
