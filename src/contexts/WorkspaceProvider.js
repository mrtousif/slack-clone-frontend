import React from "react";

const initialState = { workspace: null };

const UserContext = React.createContext({
    user: null,
    login: (userData) => {},
    logout: () => {},
});

function authReducer(state, action) {
    switch (action.type) {
        // case "LOGIN":
        //     return {
        //         ...state,
        //         user: action.payload,
        //     };
        // case "LOGOUT":
        //     return {
        //         ...state,
        //         user: null,
        //     };

        default:
            return state;
    }
}

function UserProvider(props) {
    const [state, dispatch] = React.useReducer(authReducer, initialState);
    // const [token, setToken] = useLocalStorageState("token", "");
    const token = localStorage.getItem("token");
    decodeToken(token);
    // React.useEffect(() => decodeToken());

    const login = (userData) => {
        dispatch({
            type: "LOGIN",
            payload: userData,
        });
        localStorage.setItem("token", userData.token);
        // setToken(userData.token);
    };

    const logout = () => {
        dispatch({ type: "LOGOUT" });

        localStorage.removeItem("token");
        // setToken(null);
    };

    return (
        <UserContext.Provider value={{ user: state.user, login, logout }}>
            {props.children}
        </UserContext.Provider>
    );
}

UserProvider.context = UserContext;

export default UserProvider;
