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
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { clone } from "rambda";
// import Alert from "@material-ui/lab/Alert";
// import UserProvider from "../contexts/UserProvider";
import { CREATE_CHANNEL, GET_WORKSPACES } from "../graphql/graphql";
import DialogTitle from "./DialogTitle";
// import Notification from "./Notification";

export default function FormDialog(props) {
    const { open, setOpen, handleClose, workspace } = props;
    const { handleSubmit, register, errors } = useForm();
    const [checked, setChecked] = React.useState(false);
    // const [errMsg, setErrMsg] = React.useState(null);
    // const userCtx = React.useContext(UserProvider.context);
    const handleChange = (event) => {
        // setState({ ...state, [event.target.name]: event.target.checked });
        setChecked(!checked);
    };

    const [createChannel, { loading, error }] = useMutation(CREATE_CHANNEL, {
        update(cache, result) {
            try {
                const { getWorkspaces } = cache.readQuery({
                    query: GET_WORKSPACES,
                });

                const workspaces = clone(getWorkspaces);
                console.log(workspaces);
                const updated = workspaces.map((ws) => {
                    if (ws.id === workspace.id) {
                        ws.channels.unshift(result.data.createChannel);
                    }
                    return ws;
                });

                cache.writeQuery({
                    query: GET_WORKSPACES,
                    data: {
                        getWorkspaces: updated,
                    },
                });
                setOpen(false);
            } catch (error) {
                console.error(error);
            }
        },

        onError(err) {
            // console.log("Error", { ...err });
            // const message = err.graphQLErrors[0].message;
            // // console.log(message);
            // setErrMsg(message);
            return err;
        },
    });

    const onSubmit = handleSubmit((data) => {
        const { name, description } = data;
        createChannel({
            variables: {
                workspaceId: workspace.id,
                name,
                description,
                private: checked,
            },
        });
    });

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-add-channel">
                {/* {error && <Notification message={error.message} />} */}
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
                                <Typography>Description (optional)</Typography>
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
                                    placeholder="What's this channel about?"
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
                                        onChange={handleChange}
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

// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import CloseIcon from '@material-ui/icons/Close';
// import Typography from '@material-ui/core/Typography';

// const styles = (theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });

// // const DialogContent = withStyles((theme) => ({
// //   root: {
// //     padding: theme.spacing(2),
// //   },
// // }))(MuiDialogContent);

// // const DialogActions = withStyles((theme) => ({
// //   root: {
// //     margin: 0,
// //     padding: theme.spacing(1),
// //   },
// // }))(MuiDialogActions);

// export default function CustomizedDialogs() {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Open dialog
//       </Button>
//       <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
//         <DialogTitle id="customized-dialog-title" onClose={handleClose}>
//           Modal title
//         </DialogTitle>
//         <DialogContent dividers>
//           <Typography gutterBottom>
//             Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
//             in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
//           </Typography>
//           <Typography gutterBottom>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
//             lacus vel augue laoreet rutrum faucibus dolor auctor.
//           </Typography>
//           <Typography gutterBottom>
//             Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
//             scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
//             auctor fringilla.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose} color="primary">
//             Save changes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
