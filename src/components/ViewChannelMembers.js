import React from "react";
import {
    Typography,
    Grid,
    Divider,
    TextField,
    // Button,
    Dialog,
    DialogActions,
    DialogContent,
    useMediaQuery,
    CircularProgress,
    List,
    ListItem,
} from "@material-ui/core";
// import DialogContentText from "@material-ui/core/DialogContentText";
import { useQuery } from "@apollo/client";
import DialogTitle from "./DialogTitle";
import Loading from "./Loading";
import { useTheme } from "@material-ui/core/styles";
// import { clone } from "rambda";
import { GET_CHANNEL_MEMBERS } from "../graphql/graphql";

export default function ViewChannelMembers(props) {
    const { open, handleClose, channel } = props;
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.up("sm"));
    const [members, setMembers] = React.useState([]);
    const { data, error, loading } = useQuery(GET_CHANNEL_MEMBERS, {
        variables: {
            channelId: channel.id,
        },
    });

    React.useEffect(() => {
        if (data?.getChannel?.members) {
            setMembers(data.getChannel.members);
        }
    }, [data]);

    const handleTextChange = (e) => {
        const value = e.target.value.toLowerCase();
        const filtered = members.filter((member) => {
            // console.log(member.name.includes(e.target.value));
            const name = member.name.toLowerCase();
            if (name.includes(value)) return true;
            else return false;
        });
        // console.log(filtered);
        setMembers(filtered);
        if (value.length === 0) {
            setMembers(data.getChannel.members);
        }
    };
    // console.log(channel.private);

    return (
        <div>
            <Dialog
                open={open}
                fullScreen={matchesSM ? false : true}
                onClose={handleClose}
                aria-labelledby="form-add-teammates"
            >
                <DialogTitle
                    id="form-add-teammates"
                    onClose={handleClose}
                    subtitle={
                        <Typography variant="subtitle2" color="textSecondary">
                            <i>{channel.private ? "Private" : "Public"}</i>
                        </Typography>
                    }
                >
                    {data?.getChannel?.members.length} members in #{channel.name}
                </DialogTitle>

                <Divider />

                <DialogContent>
                    <Grid
                        container
                        direction="column"
                        style={{
                            width: matchesSM ? "520px" : undefined,
                            height: matchesSM ? "440px" : undefined,
                        }}
                    >
                        <Grid item>
                            <TextField
                                margin="dense"
                                name="description"
                                id="description"
                                variant="outlined"
                                type="text"
                                fullWidth
                                placeholder="Search members"
                                onChange={handleTextChange}
                            />
                        </Grid>
                        <Grid item>
                            {error && (
                                <Typography
                                    style={{
                                        fontSize: "1em",
                                        color: "#ff1744",
                                        padding: "1em",
                                    }}
                                >
                                    {error.message}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item>
                            {loading ? (
                                <Loading />
                            ) : (
                                <List dense>
                                    {members.map((member) => (
                                        <ListItem key={member.id}>{member.name}</ListItem>
                                    ))}
                                </List>
                            )}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {/* <Button
                        type="submit"
                        disabled={loading ? true : false}
                        variant="outlined"
                        color="primary"
                        style={{ marginRight: "1em" }}
                        // className={classes.submit}
                        onClick={submitData}
                    >
                        {loading ? <CircularProgress size="2em" /> : "Save"}
                    </Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}
