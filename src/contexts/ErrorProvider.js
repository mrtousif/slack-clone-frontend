import React from "react";
import { Snackbar } from "@material-ui/core";

const initialState = { error: null };

const ErrorContext = React.createContext({
    error: null,
    set: (error) => {},
    reset: () => {},
});

function errorReducer(state, action) {
    switch (action.type) {
        case "SET":
            return {
                ...state,
                error: action.payload,
            };
        case "RESET":
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
}

function ErrorProvider(props) {
    const [state, dispatch] = React.useReducer(errorReducer, initialState);

    // React.useEffect(() => decodeToken());

    const set = (error) => {
        dispatch({
            type: "SET",
            payload: error,
        });
    };

    const reset = () => {
        dispatch({ type: "RESET" });
    };

    return (
        <UserContext.Provider value={{ error: state.error, set, reset }}>
            {props.children}
        </UserContext.Provider>
    );
}

ErrorProvider.context = ErrorContext;

export default ErrorProvider;
