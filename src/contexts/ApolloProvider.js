import React from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    // createHttpLink,
    split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";

const httpLink = createUploadLink({
    uri: "http://localhost:5000/graphql",
});

const wsLink = new WebSocketLink({
    uri: "ws://localhost:5000/subscriptions",
    options: {
        reconnect: true,
        connectionParams: {
            token: `Bearer ${localStorage.getItem("token")}`,
        },
    },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
            if (message.includes("Not authenticated")) {
                localStorage.removeItem("token");
            }
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${{
                    ...locations,
                }}, Path: ${path}`
            );

            // return <Notification message={message}/>
            // if (message.includes("not authenticated")) {
            //     Router.replace("/login");
            // } else {
            //     console.log("dispatch");
            //     snackbarStore.dispatch.snackbar.handleOpen(message);
            // }
        });

    if (networkError) console.warn(`[Network error]: ${{ ...networkError }}`);
});

const authLink = setContext(() => {
    // console.log("res:", res);
    const token = localStorage.getItem("token");
    if (!token || token.length < 15) return;
    return {
        headers: {
            authorization: token ? `Bearer ${token}` : undefined,
        },
    };
});

// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
    ({ query }) => {
        // console.log(query);
        const definition = getMainDefinition(query);
        // console.log(definition);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link: errorLink.concat(authLink.concat(splitLink)),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

function Provider(props) {
    return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

export default Provider;
