import React from "react";
import { Grid, Typography, IconButton, ButtonBase, Avatar } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import StarIcon from "@material-ui/icons/StarOutline";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import AddChannelMemberDialog from "./AddChannelMemberDialog";
import ViewChannelMembersDialog from "./ViewChannelMembers";

const ChannelTabTopBar = ({ channel }) => {
    const [addMemberDialogOpen, setAddMemberDialogOpen] = React.useState(false);
    const [viewMemberDialogOpen, setViewMemberDialogOpen] = React.useState(false);
    const addMemberDialogToggle = () => {
        setAddMemberDialogOpen(!addMemberDialogOpen);
    };
    const viewMemberDialogToggle = () => {
        setViewMemberDialogOpen(!viewMemberDialogOpen);
    };

    return (
        <Grid
            container
            alignItems="center"
            justify="space-between"
            style={{
                height: "5em",
                paddingLeft: "1rem",
                paddingRight: "1rem",
            }}
        >
            <Grid item>
                <Grid container direction="column">
                    <Grid item container alignItems="center" spacing={1}>
                        <Grid item>
                            <Typography
                                style={{ fontSize: "1em", fontWeight: "700" }}
                                color="initial"
                            >
                                {`#${channel.name}`}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton size="small">
                                <StarIcon style={{ fontSize: "inherit" }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography style={{ fontSize: "0.9em" }} color="textSecondary">
                            {channel.description ? (
                                channel.description
                            ) : (
                                <span>Add a topic</span>
                            )}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <Grid container alignItems="center">
                    <Grid item>
                        <ButtonBase
                            size="small"
                            aria-haspopup="true"
                            onClick={viewMemberDialogToggle}
                        >
                            <Avatar
                                variant="rounded"
                                style={{ height: "28px", width: "28px" }}
                            />
                        </ButtonBase>
                    </Grid>
                    <Grid item>
                        <IconButton
                            aria-label="add member to channel"
                            aria-haspopup="true"
                            onClick={addMemberDialogToggle}
                        >
                            <PersonAddIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton>
                            <InfoIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <AddChannelMemberDialog
                    channel={channel}
                    open={addMemberDialogOpen}
                    setOpen={setAddMemberDialogOpen}
                    handleClose={addMemberDialogToggle}
                />
                <ViewChannelMembersDialog
                    channel={channel}
                    open={viewMemberDialogOpen}
                    setOpen={setViewMemberDialogOpen}
                    handleClose={viewMemberDialogToggle}
                />
            </Grid>
        </Grid>
    );
};

export default ChannelTabTopBar;
