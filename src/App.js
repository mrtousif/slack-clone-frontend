import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import UserProvider from "./contexts/UserProvider";
import ApolloProvider from "./contexts/ApolloProvider";
import { CssBaseline } from "@material-ui/core"; //useMediaQuery,
import { ThemeProvider } from "@material-ui/core/styles"; //createMuiTheme,
import theme from "./theme";

import WorkspaceHome from "./pages/WorkspaceHome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateWorkspace from "./pages/CreateWorkspace";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

// import NavBar from "./components/NavBar";
// import "./app.css";
// import blue from "@material-ui/core/colors/blue";
// import orange from '@material-ui/core/colors/orange';

function PrivateRoute({ component: Component, ...rest }) {
    const auth = React.useContext(UserProvider.context);
    // console.log(auth.user);
    return (
        <Route
            {...rest}
            render={(props) =>
                auth.user ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
}

function App() {
    // const hostData = props.hostData;
    // if (WEBSITE_ID) console.log(WEBSITE_ID);

    // const theme = React.useMemo(
    //     () =>
    //         createMuiTheme({
    //             palette: {
    //                 type: hostData.darkOrLight || "light",
    //                 background: {
    //                     default: hostData.backgroundColor || "#fff",
    //                 },
    //                 primary: {
    //                     main: blue[700],
    //                 },
    //             },
    //         }),
    //     [hostData]
    // );

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <CssBaseline />
                <ApolloProvider>
                    <UserProvider>
                        <Switch>
                            <PrivateRoute exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                            <Route path="/not-found" component={NotFound} />
                            <PrivateRoute
                                exact
                                path="/create-workspace"
                                component={CreateWorkspace}
                            />
                            <PrivateRoute
                                exact
                                path="/:workspaceId/all-dms"
                                component={WorkspaceHome}
                            />
                            <PrivateRoute
                                exact
                                path="/:workspaceId/dm/:receiverId"
                                component={WorkspaceHome}
                            />
                            <PrivateRoute
                                exact
                                path="/:workspaceId/:channelId?"
                                component={WorkspaceHome}
                            />

                            <Route path="*" component={NotFound} />
                            {/* <Route
                                exact
                                path="/"
                                render={(props) => <Home {...props} />}
                            /> */}
                        </Switch>
                    </UserProvider>
                </ApolloProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
