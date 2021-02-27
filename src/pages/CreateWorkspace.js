import React from "react";
import {
    Container,
    Grid,
    TextField,
    Button,
    Typography,
    // Snackbar,
} from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import Notification from "../components/Notification";
import { CREATE_WORKSPACE } from "../graphql/graphql";
import { useMutation } from "@apollo/client";
// import UserProvider from "../contexts/UserProvider";
// import NavBar from "../components/AppBar";

import { useForm } from "react-hook-form";

// const useStyles = makeStyles((theme) => ({}));

export default function CreateWorkspace(props) {
    const { handleSubmit, register, errors } = useForm();
    // const classes = useStyles();

    const [createWorkspace, { loading, error }] = useMutation(CREATE_WORKSPACE, {
        update(cache, result) {
            const { id, channels } = result.data.createWorkspace;
            props.history.push(`/${id}/${channels[0].id}`);
            // window.open("/", "_self");
        },
        onError(err) {
            return err;
        },
    });

    //totalComments={totalComments} sortComments={sortComments}
    // style={{ marginTop: "9rem" }}

    const onSubmit = handleSubmit((data) => {
        const { name } = data;
        createWorkspace({
            variables: {
                name,
            },
        });
    });

    return (
        <Container maxWidth="md">
            {error && <Notification message={error.message} />}
            <form onSubmit={onSubmit} noValidate>
                <Grid container direction="column" style={{ marginTop: "5em" }}>
                    <Grid item>
                        <Typography variant="h4" component="h1" gutterBottom>
                            What’s the name of your company or team?
                        </Typography>
                        <Typography variant="subtitle1" color="initial" gutterBottom>
                            This will be the name of your Slack workspace — choose
                            something that your team will recognize.
                        </Typography>
                    </Grid>

                    <TextField
                        id="workspace-name"
                        required
                        name="name"
                        placeholder="Ex. Acme Co, Acme Marketing"
                        variant="outlined"
                        focused
                        style={{ marginTop: "1em" }}
                        inputRef={register({
                            required: true,
                            minLength: 2,
                            maxLength: 40,
                        })}
                        error={errors.name && true}
                    />
                    {/* </Grid> */}

                    <Grid item style={{ marginTop: "1em" }}>
                        <Button
                            disabled={loading}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
