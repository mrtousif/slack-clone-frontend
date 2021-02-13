import React from "react";
// import PropTypes from "prop-types";
import {
    AppBar,
    CssBaseline,
    // Divider,
    Hidden,
    Drawer,
    ButtonBase,
    IconButton,
    // List,
    // ListItem,
    // ListItemIcon,
    // ListItemText,
    Toolbar,
    // Typography,
    InputBase,
    // Badge,
    // Collapse,
    // Grid,
    Menu,
    MenuItem,
    // Avatar,
} from "@material-ui/core";

// import InboxIcon from "@material-ui/icons/MoveToInbox";

// import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import MoreIcon from "@material-ui/icons/More";
import SearchIcon from "@material-ui/icons/Search";
// import EditIcon from "@material-ui/icons/Edit";
// import ExpandLess from "@material-ui/icons/ExpandLess";
// import ExpandMore from "@material-ui/icons/ExpandMore";
// import StarBorder from "@material-ui/icons/StarBorder";
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
    content: {
        // display: "grid",
        flexGrow: 1,
        // paddingTop: theme.spacing(3),
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
            <CssBaseline />
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

            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
            <main className={classes.content}>
                <div style={{ height: "28px" }} />
                {/* <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
                    dolor purus non enim praesent elementum facilisis leo vel. Risus at
                  
                    vivamus at augue. At augue eget arcu dictum varius duis at consectetur
                    lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
                    faucibus et molestie ac.
                </Typography> */}
                {props.children}
            </main>
            {/* <div className={classes.toolbar}></div> */}
        </div>
    );
}

export default ResponsiveDrawer;

// <div className={classes.grow}>
//     <AppBar position="static">
//         <Toolbar>
//             <Typography className={classes.title} variant="h6" noWrap>
//                 Material-UI
//             </Typography>
//             <div className={classes.search}>
//                 <div className={classes.searchIcon}>
//                     <SearchIcon />
//                 </div>
//                 <InputBase
//                     placeholder="Search…"
//                     classes={{
//                         root: classes.inputRoot,
//                         input: classes.inputInput,
//                     }}
//                     inputProps={{ "aria-label": "search" }}
//                 />
//             </div>
//             <div className={classes.grow} />
//             <div className={classes.sectionDesktop}>
//                 <IconButton aria-label="show 4 new mails" color="inherit">
//                     <Badge badgeContent={4} color="secondary">
//                         <MailIcon />
//                     </Badge>
//                 </IconButton>
//                 <IconButton aria-label="show 17 new notifications" color="inherit">
//                     <Badge badgeContent={17} color="secondary">
//                         <NotificationsIcon />
//                     </Badge>
//                 </IconButton>
//                 <IconButton
//                     edge="end"
//                     aria-label="account of current user"
//                     aria-controls={menuId}
//                     aria-haspopup="true"
//                     onClick={handleProfileMenuOpen}
//                     color="inherit"
//                 >
//                     <AccountCircle />
//                 </IconButton>
//             </div>
//             <div className={classes.sectionMobile}>
//                 <IconButton
//                     aria-label="show more"
//                     aria-controls={mobileMenuId}
//                     aria-haspopup="true"
//                     onClick={handleMobileMenuOpen}
//                     color="inherit"
//                 >
//                     <MoreIcon />
//                 </IconButton>
//             </div>
//         </Toolbar>
//     </AppBar>
//     {renderMobileMenu}
//     {renderMenu}
// </div>;
