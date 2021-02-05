import React from "react";
import MuiLink from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

const Link = React.forwardRef(function Link(props, ref) {
    return (
        <MuiLink
            color="inherit"
            component={RouterLink}
            underline="none"
            ref={ref}
            {...props}
        />
    );
});

export default Link;
