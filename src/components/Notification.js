import React from "react";
// import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function SimpleSnackbar(props) {
    const { message } = props;
    const [open, setOpen] = React.useState(true);

    // const handleClick = () => {
    //     setOpen(true);
    // };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return message && message.length > 1 ? (
        <Snackbar
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            action={
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        />
    ) : null;
}
