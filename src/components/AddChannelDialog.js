import React from "react";
import {
    Button,
    Typography,
    Switch,
    Grid,
    Divider,
    CircularProgress,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { clone } from "rambda";
// import Alert from "@material-ui/lab/Alert";
// import UserProvider from "../contexts/UserProvider";
import {
    CREATE_CHANNEL,
    // GET_WORKSPACE,
    GET_USER_WORKSPACES,
} from "../graphql/graphql";
import DialogTitle from "./DialogTitle";
import Notification from "./Notification";
import { useParams } from "react-router-dom";

export default function FormDialog(props) {
    const { workspaceId } = useParams();
    // const history = useHistory();
    const { open, setOpen, handleClose } = props;
    const { handleSubmit, register, errors } = useForm();
    const [checked, setChecked] = React.useState(false);
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.up("sm"));
    // const [errMsg, setErrMsg] = React.useState(null);
    // const userCtx = React.useContext(UserProvider.context);

    const [createChannel, { loading, error }] = useMutation(CREATE_CHANNEL, {
        update(cache, result) {
            try {
                const { getUserWorkspaces } = cache.readQuery({
                    query: GET_USER_WORKSPACES,
                });
                console.log(getUserWorkspaces);

                let workspaces = clone(getUserWorkspaces);
                console.log(workspaces);
                // const updated = workspace.channels.unshift(result.data.createChannel);
                workspaces = workspaces.map((ws) => {
                    if (ws.id === workspaceId) {
                        ws.channels.unshift(result.data.createChannel);
                    }
                    return ws;
                });

                cache.writeQuery({
                    query: GET_USER_WORKSPACES,
                    data: {
                        getUserWorkspaces: workspaces,
                    },
                });
                setOpen(false);
                // history.push(`/${workspaceId}/${result.data.createChannel.id}`);
            } catch (error) {
                console.error(error);
            }
        },

        onError(err) {
            return err;
        },
    });

    const onSubmit = handleSubmit((data) => {
        const { name, description } = data;
        createChannel({
            variables: {
                workspaceId,
                name,
                description,
                private: checked,
            },
        });
    });

    return (
        <div>
            <Dialog
                fullScreen={matchesSM ? false : true}
                open={open}
                onClose={handleClose}
                aria-labelledby="form-add-channel"
            >
                {error && <Notification message={error.message} />}
                <DialogTitle id="form-add-channel" onClose={handleClose}>
                    Create a channel
                </DialogTitle>
                <Divider />
                <form onSubmit={onSubmit} noValidate>
                    <DialogContent>
                        <DialogContentText>
                            Channels are where your team communicates. They’re best when
                            organized around a topic – #marketing, for example.
                        </DialogContentText>

                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <Typography>Name</Typography>
                                <TextField
                                    required
                                    autoFocus
                                    margin="dense"
                                    name="name"
                                    id="name"
                                    variant="outlined"
                                    // label="Email Address"
                                    type="text"
                                    placeholder="e.g. subscription-budget"
                                    fullWidth
                                    inputRef={register({
                                        required: true,
                                        minLength: 2,
                                        maxLength: 20,
                                    })}
                                    error={
                                        (errors.name && true) ||
                                        (error && error.name && true)
                                    }
                                    helperText={
                                        "Channel name must be unique and maximum length is 20"
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <Typography>Description</Typography>
                                <TextField
                                    margin="dense"
                                    name="description"
                                    id="description"
                                    variant="outlined"
                                    // label="Email Address"
                                    type="text"
                                    fullWidth
                                    inputRef={register({
                                        minLength: 2,
                                        maxLength: 80,
                                    })}
                                    placeholder="What's this channel about? (optional)"
                                />
                            </Grid>

                            <Grid
                                item
                                container
                                justify="space-between"
                                alignItems="center"
                            >
                                <Grid item xs={8}>
                                    <Typography variant="body1">Make Private</Typography>
                                    <Typography color="textSecondary">
                                        When a channel is set to private, it can only be
                                        viewed or joined by invitation.
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Switch
                                        name="private"
                                        color="primary"
                                        checked={checked}
                                        onChange={() => setChecked(!checked)}
                                        inputProps={{
                                            "aria-label": "checkbox",
                                        }}
                                        value={checked}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            disabled={loading ? true : false}
                            variant="outlined"
                            color="primary"
                            // className={classes.submit}
                            // onClick={handleClose}
                        >
                            {loading ? <CircularProgress size="2em" /> : "Create"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
