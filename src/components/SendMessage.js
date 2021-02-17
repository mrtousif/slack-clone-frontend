import React from "react";
import {
    IconButton,
    FormControl,
    InputAdornment,
    OutlinedInput,
    Paper,
} from "@material-ui/core";
// import {
//     //  useTheme,
//     makeStyles,
// } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_MESSAGE } from "../graphql/graphql";

// const useStyles = makeStyles((theme) => ({
//     footer: {
//         position: "fixed",
//         bottom: 0,
//         top: "auto",
//         padding: "0.5em",
//         width: "100%",
//     },
// }));

export default function SendMessage(props) {
    // const classes = useStyles();
    // const theme = useTheme();
    const { channelName, channelId } = props;
    const { handleSubmit, register } = useForm();
    const [createMessage] = useMutation(CREATE_MESSAGE, {
        update(cache, result) {
            console.log(result);
        },
        onError(err) {
            return err;
        },
    });

    const onSubmit = handleSubmit((data) => {
        console.log(channelId);
        const { message } = data;

        createMessage({
            variables: { channelId, message },
        });
    });

    return (
        <Paper
            style={{
                paddingLeft: "1.5em",
                paddingRight: "1.5em",
                paddingBottom: "1.5em",
            }}
        >
            <form onSubmit={onSubmit} noValidate>
                <FormControl
                    // className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    fullWidth
                >
                    {/* <InputLabel htmlFor="outlined-adornment-message">Message</InputLabel> */}
                    <OutlinedInput
                        id="outlined-adornment-message"
                        type="text"
                        // value={values.password}
                        // onChange={handleChange("password")}
                        placeholder={`Message #${channelName}`}
                        fullWidth
                        multiline
                        // labelWidth={70}
                        name="message"
                        inputRef={register({
                            required: true,
                        })}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle message"
                                    type="submit"
                                    edge="end"
                                >
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </form>
        </Paper>
    );
}
