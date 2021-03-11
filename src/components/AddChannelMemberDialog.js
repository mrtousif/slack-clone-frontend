import React from "react";
import {
    Button,
    Typography,
    Grid,
    Divider,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    useMediaQuery,
} from "@material-ui/core";
// import DialogContentText from "@material-ui/core/DialogContentText";
import { useMutation, useQuery } from "@apollo/client";
import DialogTitle from "./DialogTitle";
import { useTheme } from "@material-ui/core/styles";
// import { clone } from "rambda";
import MultiSelect from "./MultiSelect";
// import UserProvider from "../contexts/UserProvider";
import {
    ADD_CHANNEL_MEMBERS,
    GET_MEMBERS_TO_ADD_TO_THE_CHANNEL,
} from "../graphql/graphql";
import { useParams } from "react-router-dom";

export default function AddChannelMember(props) {
    const { workspaceId } = useParams();
    const { open, setOpen, handleClose, channel } = props;
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.up("sm"));

    // const userCtx = React.useContext(UserProvider.context);
    const { data, loading } = useQuery(GET_MEMBERS_TO_ADD_TO_THE_CHANNEL, {
        variables: {
            workspaceId,
            channelId: channel.id,
        },
    });
    console.log(data);

    const [addChannelMembers, { loading: loading2, error }] = useMutation(
        ADD_CHANNEL_MEMBERS,
        {
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
        }
    );

    const submitData = (data) => {
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
                    Add people to #{channel.name}
                </DialogTitle>
                <Divider />

                <DialogContent
                    style={{
                        width: matchesSM ? "560px" : "360px",
                    }}
                >
                    <Grid container direction="column">
                        <Grid item>
                            <MultiSelect
                                loading={loading}
                                items={data?.getMembersToAddToTheChannel}
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
                    <Button
                        type="submit"
                        disabled={loading2 ? true : false}
                        variant="outlined"
                        color="primary"
                        style={{ marginRight: "1em" }}
                        // className={classes.submit}
                        onClick={submitData}
                    >
                        {loading2 ? <CircularProgress size="2em" /> : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
