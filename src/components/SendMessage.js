import React from "react";
import {
    IconButton,
    FormControl,
    InputAdornment,
    OutlinedInput,
    // Paper,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useForm } from "react-hook-form";
// import { useMutation } from "@apollo/client";

export default function SendMessage(props) {
    const { placeholder, channelId, createMessage, receiverId, workspaceId } = props;
    const { handleSubmit, register, reset } = useForm();

    const onSubmit = handleSubmit((data) => {
        const { message } = data;
        if (channelId) {
            createMessage({
                variables: { channelId, message },
            });
        } else if (receiverId) {
            createMessage({
                variables: { receiverId, message, workspaceId },
            });
        }

        reset();
    });

    return (
        <div
            style={{
                paddingLeft: "1.5em",
                paddingRight: "1.5em",
                paddingBottom: "1em",
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
                        placeholder={`Message #${placeholder}`}
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
        </div>
    );
}
