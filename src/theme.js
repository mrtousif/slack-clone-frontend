// import { red } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#1164a3",
        },
        secondary: {
            main: "#3f0e40",
        },
        // error: {
        //   main: red.A400,
        // },
        background: {
            default: "#fff",
        },
    },
    typography: {
        // body2: {
        //   fontFamily: "Lato, sans-serif",
        //   fontWeight: 300,
        // },
    },
    drawerWidth: 260,
});

export default theme;
