import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
// import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

export default function TransitionAlerts({ message, severity }) {
    // const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        console.log(message);
        // if (message && message.length > 1) {
        //     setOpen(true);
        //     setTimeout(() => {
        //         setOpen(false);
        //     }, 6000);
        // }
    }, [message]);

    return (
        <Collapse in={open}>
            <Alert
                severity={severity}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </Collapse>
    );
}
