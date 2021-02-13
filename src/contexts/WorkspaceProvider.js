import React from "react";

const initialState = { workspaces: [] };

const WorkspaceContext = React.createContext({
    workspaces: [],
    current: {},
    set: (workspaces) => {},
});

function authReducer(state, action) {
    switch (action.type) {
        case "SET":
            return {
                ...state,
                workspaces: action.payload,
            };
        case "RESET":
            return {
                ...state,
                workspaces: [],
            };

        default:
            return state;
    }
}

function WorkspaceProvider(props) {
    const [state, dispatch] = React.useReducer(authReducer, initialState);

    // React.useEffect(() => decodeToken());

    const set = (workspaces) => {
        dispatch({
            type: "SET",
            payload: workspaces,
        });
    };

    // const logout = () => {
    //     dispatch({ type: "LOGOUT" });
    // };

    return (
        <WorkspaceContext.Provider
            value={{ workspaces: state.workspaces, current: state.current, set }}
        >
            {props.children}
        </WorkspaceContext.Provider>
    );
}

WorkspaceProvider.context = WorkspaceContext;

export default WorkspaceProvider;
