import React from "react";
import {
    // Container,
    // Divider,
    // Grid,
    // Avatar,
    // Typography,
    // Button,
    // IconButton,
    // ButtonBase,
    TextField,
    // FormControl,
    // InputAdornment,
    // OutlinedInput,
} from "@material-ui/core";
// import {
//     //  useTheme,
//     makeStyles,
// } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//     footer: {
//         position: "fixed",
//         bottom: 0,
//         top: "auto",
//         padding: "0.5em",
//         width: "100%",
//     },
//     // style={{ }}
// }));

export default function SendMessage(props) {
    // const classes = useStyles();
    // const theme = useTheme();
    const { channel } = props;

    return (
        <div>
            <TextField
                variant="outlined"
                focused
                placeholder={`Send message to # ${channel.name}`}
                multiline
                fullWidth
            />
            {/* <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
            >
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={70}
                />
            </FormControl> */}
        </div>
    );
}
