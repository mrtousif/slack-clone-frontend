import React from "react";

import {
    AppBar,
    // Divider,
    Hidden,
    Drawer,
    ButtonBase,
    IconButton,
    Toolbar,
    // Typography,
    InputBase,
    Menu,
    MenuItem,
    // Avatar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import {
    makeStyles,
    //  withStyles,
    useTheme,
    fade,
} from "@material-ui/core/styles";
import SideBar from "./SideBar";
import Avatar from "./Avatar";

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
    appBar: {
        backgroundColor: theme.palette.secondary.main,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${theme.drawerWidth}px)`,
            marginLeft: theme.drawerWidth,
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
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            // marginLeft: theme.spacing(3),
            marginLeft: "auto",
            marginRight: "auto",
            width: "500px",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
        height: "28px",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "30ch",
        },
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

function ResponsiveDrawer(props) {
    const { window, workspaceData, workspaces } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isMenuOpen = Boolean(anchorEl);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // console.log(workspaces);

    // const handleMobileMenuClose = () => {
    //     setMobileMoreAnchorEl(null);
    // };

    const handleAccountMenuClose = () => {
        setAnchorEl(null);
        // handleMobileMenuClose();
    };
    // const [open, setOpen] = React.useState(true);

    // const handleClick = () => {
    //     setOpen(!open);
    // };

    const menuId = "primary-search-account-menu";
    // const mobileMenuId = "primary-search-account-menu-mobile";
    const renderAccountMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleAccountMenuClose}
        >
            <MenuItem onClick={handleAccountMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleAccountMenuClose}>My account</MenuItem>
        </Menu>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar variant="dense" classes={{ root: classes.height }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ "aria-label": "search" }}
                        />
                    </div>

                    <div style={{ marginLeft: "auto" }}>
                        <ButtonBase
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar src={"someshit"} />
                        </ButtonBase>
                    </div>
                </Toolbar>
                {renderAccountMenu}
            </AppBar>

            <nav className={classes.drawer}>
                <Hidden smUp>
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <SideBar workspaceData={workspaceData} workspaces={workspaces} />
                    </Drawer>
                </Hidden>
                <Hidden xsDown>
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        <SideBar workspaceData={workspaceData} workspaces={workspaces} />
                    </Drawer>
                </Hidden>
            </nav>
            <main
                style={{
                    // display: "flex",
                    flexGrow: 1,
                    // paddingTop: theme.spacing(3),
                }}
            >
                <div style={{ width: "100%", height: "30px" }} />
                <div>{props.children}</div>
            </main>
            {/* <div className={classes.toolbar}></div> */}
        </div>
    );
}

export default ResponsiveDrawer;
