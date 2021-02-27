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
import LinkIcon from "@material-ui/icons/Link";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import DialogTitle from "./DialogTitle";
import { useTheme } from "@material-ui/core/styles";
// import { clone } from "rambda";
// import Alert from "@material-ui/lab/Alert";
// import UserProvider from "../contexts/UserProvider";
import { ADD_WORKSPACE_MEMBERS } from "../graphql/graphql";

export default function AddTeammates(props) {
    const { open, setOpen, handleClose, workspace } = props;
    const { handleSubmit, register, errors } = useForm();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.up("sm"));
    // const [errMsg, setErrMsg] = React.useState(null);
    // const userCtx = React.useContext(UserProvider.context);
    const [addTeammates, { loading, error }] = useMutation(ADD_WORKSPACE_MEMBERS, {
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

    const onSubmit = handleSubmit((data) => {
        const { emails } = data;
        const multipleEmail = emails.split(",");
        // console.log(multipleEmail);
        addTeammates({
            variables: {
                workspaceId: workspace.id,
                emails: multipleEmail,
            },
        });
    });

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-add-teammates"
            >
                <DialogTitle id="form-add-teammates" onClose={handleClose}>
                    Invite people to {workspace.name}
                </DialogTitle>
                <Divider />
                <form onSubmit={onSubmit} noValidate>
                    <DialogContent
                        style={{
                            width: matchesSM ? "560px" : "350px",
                        }}
                    >
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <Typography variant="subtitle2">To:</Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    required
                                    autoFocus
                                    // margin="dense"
                                    name="emails"
                                    id="emails"
                                    variant="outlined"
                                    type="text"
                                    placeholder={`name@comapny.com, name@comapny.com`}
                                    multiline
                                    fullWidth
                                    rows={2}
                                    inputRef={register({
                                        minLength: 4,
                                        pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
                                    })}
                                    error={errors.emails && true}
                                    // helperText="Number of maximum character is 40"
                                />
                            </Grid>
                            <Grid item>
                                {error && (
                                    <Typography
                                        style={{ fontSize: "1em", color: "#ff1744" }}
                                    >
                                        {error.message}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Grid
                            container
                            justify="space-between"
                            style={{ paddingRight: "1em", paddingLeft: "1em" }}
                        >
                            <Grid item>
                                <Button
                                    startIcon={<LinkIcon />}
                                    color="primary"
                                    disableRipple
                                    style={{ textTransform: "none" }}
                                    onClick={(e) => {
                                        console.log(e.target);
                                    }}
                                >
                                    Copy invite link
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    type="submit"
                                    disabled={loading ? true : false}
                                    variant="outlined"
                                    color="primary"
                                    // className={classes.submit}
                                    // onClick={handleClose}
                                >
                                    {loading ? <CircularProgress size="2em" /> : "Send"}
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
