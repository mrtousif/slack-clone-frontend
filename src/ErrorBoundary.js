import React from "react";
import { Typography } from "@material-ui/core";

class ErrorBoundary extends React.Component {
    constructor() {
        super();
        this.state = {
            hasError: false,
        };
    }

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10%",
                    }}
                >
                    <Typography variant="subtitle1" color="initial">
                        Something went wrong
                    </Typography>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
