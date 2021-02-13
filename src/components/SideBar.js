import React from "react";
import {
    Menu,
    MenuItem,
    Grid,
    Divider,
    Typography,
    IconButton,
    // Avatar,
    ButtonBase,
} from "@material-ui/core";
import MessageIcon from "@material-ui/icons/Message";
// import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
// import StarBorder from "@material-ui/icons/StarBorder";
import { makeStyles } from "@material-ui/core/styles";
import ListWithSubList from "./ListWithSubList";
import Link from "./Link";
// import { useRouteMatch } from "react-hook-form";

// const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
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

    color: {
        color: "rgb(201, 209, 217)",
    },
    height: {
        minHeight: "39px",
    },
}));

export default function SideBar(props) {
    const { workspaceData, setChannelId } = props;
    // workspaces = [],
    const classes = useStyles();
    // console.log(workspaces);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleWorkspaceMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleWorkspaceMenuClose = () => {
        setAnchorEl(null);
        // handleMobileMenuClose();
    };

    const menuId = "workspace-menu";
    const renderWorkspaceMenu = (
        <Menu
            anchorEl={anchorEl}
            // anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            // keepMounted
            // transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleWorkspaceMenuClose}
        >
            <MenuItem onClick={handleWorkspaceMenuClose}>
                Invite people to workspace
            </MenuItem>
            <MenuItem onClick={handleWorkspaceMenuClose}>Sign out of workspace</MenuItem>
            <MenuItem component={Link} to="/create-workspace">
                Add workspace
            </MenuItem>
            <MenuItem onClick={handleWorkspaceMenuClose}>Switch workspaces</MenuItem>
        </Menu>
    );

    // const switchWorkspace = () => {};

    return (
        <div>
            {/* <Grid container> */}
            {/* <Grid item style={{ width: "4em", paddingTop: "2em" }}>
                    <Grid container direction="column" alignItems="center" spacing={1}>
                        {workspaces.map((workspace) => (
                            <Grid item key={workspace.id}>
                                <ButtonBase
                                    component={Link}
                                    to={`/${workspace.id}`}
                                    onClick={switchWorkspace}
                                >
                                    <Avatar variant="rounded">{workspace.name[0]}</Avatar>
                                </ButtonBase>
                            </Grid>
                        ))}
                    </Grid>
                </Grid> */}

            {/* <Grid item> */}
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
                                <ButtonBase
                                    edge="end"
                                    aria-label="workspace"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleWorkspaceMenuOpen}
                                    color="inherit"
                                    disableRipple
                                    // style={{ color: "#fff" }}
                                >
                                    <Typography>{workspaceData.name}</Typography>
                                    <ExpandMore color="inherit" />
                                </ButtonBase>
                            </Grid>
                            {renderWorkspaceMenu}
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
            <ListWithSubList
                name="Channels"
                subList={workspaceData.channels}
                setChannelId={setChannelId}
                workspace={workspaceData}
            />
            <Divider />
            <ListWithSubList
                name="Direct messages"
                subList={workspaceData.messages}
                workspace={workspaceData}
            />
            <Divider />
            <ListWithSubList name="Apps" subList={workspaceData.apps} />
            <Divider />
            {/* </Grid> */}
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
            {/* </Grid> */}
        </div>
    );
}
