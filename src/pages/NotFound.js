import React from "react";
import { Container, Typography, Grid } from "@material-ui/core";

const NotFoundPage = () => (
    <Container maxWidth="md">
        <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
            style={{ height: "100vh" }}
        >
            <Typography variant="h3">404: Not Found</Typography>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Grid>
    </Container>
);

export default NotFoundPage;
