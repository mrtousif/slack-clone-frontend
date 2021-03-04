import React from "react";
import {
    IconButton,
    FormControl,
    InputAdornment,
    OutlinedInput,
    // Paper,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useForm, Controller } from "react-hook-form";
// import { useMutation } from "@apollo/client";
import Dropzone from "./Dropzone";

export default function SendMessage(props) {
    const {
        placeholder,
        channelId,
        createMessage,
        receiverId,
        workspaceId,
        filesToUpload,
        setFilesToUpload,
    } = props;

    const { handleSubmit, register, reset, control } = useForm();

    const onSubmit = handleSubmit((data) => {
        console.log(filesToUpload);
        console.log(data);
        const { message } = data;

        if (channelId) {
            createMessage({
                variables: { channelId, message, file: filesToUpload[0] },
            });
        } else if (receiverId) {
            createMessage({
                variables: { receiverId, message, workspaceId },
            });
        }

        reset();
    });

    return (
        <div>
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
                        inputRef={register({})}
                        startAdornment={
                            <Controller
                                name="file"
                                defaultValue={false}
                                control={control}
                                render={({ onChange }) => (
                                    <Dropzone
                                        onChange={onChange}
                                        setFilesToUpload={setFilesToUpload}
                                    >
                                        <InputAdornment position="start">
                                            <IconButton
                                                aria-label="upload file"
                                                edge="start"
                                            >
                                                <AttachFileIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    </Dropzone>
                                )}
                            />
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="send message"
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
