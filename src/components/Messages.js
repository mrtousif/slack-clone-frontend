import React, { useState } from "react";
import {
    Grid,
    Typography,
    IconButton,
    Avatar,
    Menu,
    // MenuItem
    Grow,
} from "@material-ui/core";
// import { useTheme } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import MoreVertIcon from "@material-ui/icons/MoreVert";
// import { parseISO, formatDistanceToNow } from "date-fns";
// import UserProvider from "../contexts/UserProvider";
import { GET_MESSAGES } from "../graphql/graphql";
import Loading from "./Loading";
import { useRouteMatch } from "react-router-dom";

export default function Messages(props) {
    const { channelId: cid } = props;
    // channelId, owner, createdAt, text
    const {
        params: { channelId },
    } = useRouteMatch();

    const { loading, data } = useQuery(GET_MESSAGES, {
        variables: {
            channelId: channelId || cid,
        },
    });

    if (loading) return <Loading />;

    // const userCtx = React.useContext(UserProvider.context);

    return data && data.getMessages.length > 0 ? (
        <Grid container direction="column-reverse" style={{ padding: "1em" }}>
            {data.getMessages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
        </Grid>
    ) : null;
}

const Message = ({ message }) => {
    const { text, user, createdAt } = message;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // let commentDate = "";
    // if (createdAt) {
    //     commentDate = formatDistanceToNow(parseISO(createdAt), {
    //         addSuffix: true,
    //     });
    // }

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
                    <Avatar variant="rounded" alt={user.name} src={user.photo} />
                </Grid>

                <Grid item container xs>
                    <Grid item container>
                        <Grid item>
                            <Typography variant="subtitle2">{user.name}</Typography>
                        </Grid>
                        <Grid item style={{ marginLeft: "0.5em", marginRight: "0.5em" }}>
                            <Typography variant="caption" color="textSecondary">
                                {createdAt}
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
