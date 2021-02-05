import React from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    // ApolloLink
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
// process.env.REACT_APP_API_URL
const httpLink = createHttpLink({
    uri: "http://localhost:5000/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext(() => {
    const token = localStorage.getItem("token");
    if (!token || token.length < 15) return;

    return {
        headers: {
            authorization: token ? `Bearer ${token}` : undefined,
        },
    };
});

const client = new ApolloClient({
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache(),
});

function Provider(props) {
    return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

export default Provider;
