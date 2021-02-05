import React from "react";
// import useLocalStorageState from "use-local-storage-state";
import jwtDecode from "jwt-decode";

const initialState = { user: null };

const UserContext = React.createContext({
    user: null,
    login: (userData) => {},
    logout: () => {},
});

function decodeToken(token) {
    // if (initialState.user) return;
    //   const token = localStorage.getItem("token");
    // console.log(token);
    if (!token || token.length < 10) return;
    const decodedToken = jwtDecode(token);
    // console.log(decodedToken);
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
    } else {
        initialState.user = decodedToken;
        initialState.user.token = token;
    }
}

function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
            };

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
