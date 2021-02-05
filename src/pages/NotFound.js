import React from "react";
// import SEO from "../components/seo"
import { Container, Typography } from "@material-ui/core";

const NotFoundPage = () => (
    <Container maxWidth="md">
        <Typography variant="h3">404: Not Found</Typography>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Container>
);

export default NotFoundPage;
