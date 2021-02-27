import React from "react";
import {
    Grid,
    Typography,
    IconButton,
    Avatar,
    Menu,
    // MenuItem
    Grow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { parseISO, formatDistanceToNow } from "date-fns";
import { blue } from "@material-ui/core/colors";
// import UserProvider from "../contexts/UserProvider";;
const useStyles = makeStyles((theme) => ({
    blue: {
        // color: theme.palette.getContrastText(blue[300]),
        color: blue[800],
        backgroundColor: "#ddd",
    },
}));

export default class Messages extends React.Component {
    componentDidMount() {
        this.unsubscribe = this.props.subscribeForNewMessages();
        console.log(this.unsubscribe);
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    render() {
        return this.props.messages.map((message) => (
            <Message key={message.id} message={message} />
        ));
    }
}

const Message = ({ message }) => {
    const classes = useStyles();
    const { text, user, createdAt } = message;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let messageDate = "";
    if (createdAt) {
        messageDate = formatDistanceToNow(parseISO(createdAt), {
            addSuffix: true,
        });
    }

    const messageMenu = (
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            // PaperProps={{
            //     style: {
            //         maxHeight: ITEM_HEIGHT * 4.5,
            //         width: '12ch',
            //     },
            // }}
        >
            {/* {userCtx.user && userCtx.user.id === owner.id ? (
                <MenuItem
                    onClick={(e) => {
                        handleClose(e);
                    }}
                >
                    Delete
                </MenuItem>
                ) : (
                <MenuItem
                    onClick={(e) => {
                        handleClose(e);
                    }}
                >
                    Report
                </MenuItem>
                )} 
                */}
        </Menu>
    );
    // style={{ marginBottom: "0.1em" }}
    return (
        <Grow in={true}>
            <Grid item container>
                <Grid item style={{ marginRight: "0.5em", marginTop: "0.3em" }}>
                    <Avatar
                        className={classes.blue}
                        variant="rounded"
                        alt={user.name}
                        src={user.photo}
                    />
                </Grid>

                <Grid item container xs>
                    <Grid item container>
                        <Grid item>
                            <Typography variant="subtitle2">{user.name}</Typography>
                        </Grid>
                        <Grid item style={{ marginLeft: "0.5em", marginRight: "0.5em" }}>
                            <Typography variant="caption" color="textSecondary">
                                {messageDate}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item container>
                        <Grid
                            item
                            xs={12}
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                                overflowWrap: "break-word",
                                wordBreak: "break-word",
                            }}
                        >
                            <Typography variant="body2">{text}</Typography>
                        </Grid>

                        <Grid item style={{ marginLeft: "auto" }}>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                                style={{ fontSize: "1.1em" }}
                            >
                                <MoreVertIcon fontSize="inherit" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                {messageMenu}
            </Grid>
        </Grow>
    );
};

// export default Messages;
