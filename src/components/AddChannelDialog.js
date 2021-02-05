import React from "react";
import {
    Button,
    Typography,
    IconButton,
    Switch,
    Grid,
    Divider,
    CircularProgress,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import Alert from "@material-ui/lab/Alert";
import UserProvider from "../contexts/UserProvider";
import { CREATE_CHANNEL } from "../graphql/graphql";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h5">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

export default function FormDialog(props) {
    const { dialogOpen: open, handleClose } = props;
    const { handleSubmit, register, errors } = useForm();
    const [checked, setChecked] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState(null);

    const handleChange = (event) => {
        // setState({ ...state, [event.target.name]: event.target.checked });
        setChecked(!checked);
    };

    const userCtx = React.useContext(UserProvider.context);

    const [createChannel, { loading }] = useMutation(CREATE_CHANNEL, {
        update(proxy, result) {
            userCtx.login(result.data.login);
            // props.history.push("/");
            // window.open("/", "_self");
            // window.close();
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
        console.log(data);
        createChannel({
            variables: {
                name,
                description,
            },
        });
    });

    return (
        <div>
            {/* <Button onClick={handleClickOpen}>Open form dialog</Button> */}
            {errMsg && errMsg.length > 2 ? (
                <Alert severity="error">{errMsg}</Alert>
            ) : null}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" onClose={handleClose}>
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
                                    // id="name"
                                    variant="outlined"
                                    // label="Email Address"
                                    type="text"
                                    placeholder="e.g. subscription-budget"
                                    fullWidth
                                    inputRef={register({
                                        required: true,
                                        minLength: 2,
                                        maxLength: 80,
                                    })}
                                    error={errors.name && true}
                                    helperText="Maximum character is 80"
                                />
                            </Grid>
                            <Grid item>
                                <Typography>Description (optional)</Typography>
                                <TextField
                                    margin="dense"
                                    name="description"
                                    // id="description"
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
