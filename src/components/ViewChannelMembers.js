import React from "react";
import {
    Button,
    Typography,
    Grid,
    Divider,
    CircularProgress,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    useMediaQuery,
} from "@material-ui/core";
// import DialogContentText from "@material-ui/core/DialogContentText";
import { useMutation } from "@apollo/client";
import DialogTitle from "./DialogTitle";
import { useTheme } from "@material-ui/core/styles";
// import { clone } from "rambda";
import { ADD_CHANNEL_MEMBERS } from "../graphql/graphql";

export default function ViewChannelMembers(props) {
    const { open, setOpen, handleClose, channel } = props;
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.up("sm"));

    const [addChannelMembers, { loading, error }] = useMutation(ADD_CHANNEL_MEMBERS, {
        update(cache, result) {
            try {
                setOpen(false);
            } catch (error) {
                console.error(error);
            }
        },

        onError(err) {
            return err;
        },
    });

    const onSubmit = (data) => {
        const { emails } = data;
        const multipleEmail = emails.split(",");
        // console.log(multipleEmail);
        addChannelMembers({
            variables: {
                channelId: channel.id,
                emails: multipleEmail,
            },
        });
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-add-teammates"
            >
                <DialogTitle id="form-add-teammates" onClose={handleClose}>
                    0 members in #{channel.name}
                </DialogTitle>
                <Divider />

                <DialogContent
                    style={{
                        width: matchesSM ? "520px" : "360px",
                        height: "440px",
                    }}
                >
                    <Grid container direction="column">
                        <Grid item>
                            <TextField
                                margin="dense"
                                name="description"
                                id="description"
                                variant="outlined"
                                // label="Email Address"
                                type="text"
                                fullWidth
                                placeholder="Search members"
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
                        // onClick={handleClose}
                    >
                        {loading ? <CircularProgress size="2em" /> : "Save"}
                    </Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}
