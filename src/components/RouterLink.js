import React from "react";
import MuiLink from "@material-ui/core/Link";
import { Link } from "react-router-dom";

const RouterLink = React.forwardRef(function RouterLink(props, ref) {
    return (
        <MuiLink color="inherit" component={Link} underline="none" ref={ref} {...props} />
    );
});

export default RouterLink;
