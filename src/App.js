import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import UserProvider from "./contexts/UserProvider";
import ApolloProvider from "./contexts/ApolloProvider";
import { CssBaseline } from "@material-ui/core"; //useMediaQuery,
import { ThemeProvider } from "@material-ui/core/styles"; //createMuiTheme,
import theme from "./theme";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateWorkspace from "./pages/CreateWorkspace";
import NotFound from "./pages/NotFound";
import ChannelTab from "./pages/ChannelTab";
// import NavBar from "./components/NavBar";
// import "./app.css";
// import blue from "@material-ui/core/colors/blue";
// import orange from '@material-ui/core/colors/orange';

function PrivateRoute({ children, ...rest }) {
    const auth = React.useContext(UserProvider.context);
    // console.log(auth.user);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
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
                            <PrivateRoute exact path="/">
                                <Home />
                            </PrivateRoute>

                            {/* <ScrollToTop> */}
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                            <PrivateRoute exact path="/create-workspace">
                                <CreateWorkspace />
                            </PrivateRoute>
                            <PrivateRoute exact path="/:workspaceId/:channelId">
                                <ChannelTab />
                            </PrivateRoute>
                            <Route path="*" component={NotFound} />
                            {/* <Route
                                exact
                                path="/"
                                render={(props) => <Home {...props} />}
                            /> */}

                            {/* </ScrollToTop> */}
                        </Switch>
                    </UserProvider>
                </ApolloProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
