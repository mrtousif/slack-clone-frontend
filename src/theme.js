// import { red } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles";

const PRIMARY_COLOR = "#1164a3";
const SECONDARY_COLOR = "#3f0e40";

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: PRIMARY_COLOR,
        },
        secondary: {
            main: SECONDARY_COLOR,
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
    overrides: {
        MuiListItem: {
            root: {
                "&$selected": {
                    backgroundColor: PRIMARY_COLOR,
                    "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                        color: "#fff",
                    },
                },
                "&:hover:is($selected)": {
                    backgroundColor: PRIMARY_COLOR,
                },
            },
        },
    },
});

export default theme;
