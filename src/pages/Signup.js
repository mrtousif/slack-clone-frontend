import React from "react";
import {
    Avatar,
    Container,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Typography,
    CircularProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import UserProvider from "../contexts/UserProvider";
import { SIGNUP_INPUT } from "../graphql/graphql";
import Notification from "../components/Notification";
import Link from "../components/RouterLink";
// import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp(props) {
    const { handleSubmit, register, errors } = useForm();
    const classes = useStyles();
    const userCtx = React.useContext(UserProvider.context);
    // const [errMsg, setErrMsg] = useState(null);
    const [addUser, { loading, error }] = useMutation(SIGNUP_INPUT, {
        update(cache, result) {
            // console.log(result);
            userCtx.login(result.data.signup);
            props.history.push("/create-workspace");
            // window.open("/", "_self");
        },
        onError(err) {
            // const message = err.graphQLErrors[0].message;
            // setErrMsg(message);
            return err;
        },
    });

    const onSubmit = handleSubmit((data) => {
        const { name, email, password } = data;
        addUser({
            variables: {
                name,
                email,
                password,
                confirmPassword: password,
            },
        });
    });

    return (
        <Container component="main" maxWidth="xs">
            {error && <Notification message={error.message} />}
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {/* <div style={{ marginTop: "1em" }}>
                    <Facebook setLoginRes={setLoginRes} />
                </div> */}

                <form className={classes.form} onSubmit={onSubmit} noValidate>
                    <TextField
                        autoComplete="name"
                        margin="normal"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                        inputRef={register({
                            required: true,
                            minLength: 2,
                            maxLength: 20,
                        })}
                        error={errors.name && true}
                        helperText={errors.name && "Name is required"}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        inputRef={register({
                            required: true,
                            pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i,
                        })}
                        error={errors.email && true}
                        helperText={errors.email && "A valid email is required"}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputRef={register({
                            required: true,
                            minLength: 9,
                            maxLength: 50,
                        })}
                        error={errors.password && true}
                        helperText={
                            errors.password &&
                            "Password must be minimum twelve characters"
                        }
                    />

                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {loading ? <CircularProgress size="2em" /> : "Sign up"}
                    </Button>
                </form>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link variant="body2" to="/login">
                            Already have an account? Log in
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}
