// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from "react";
import { TextField, Typography, Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import { GET_WORKSPACE_MEMBERS } from "../graphql/graphql";
import UserProvider from "../contexts/UserProvider";
// function sleep(delay = 0) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, delay);
//     });
// }

export default function UserSelect() {
    const { user } = React.useContext(UserProvider.context);
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    // const loading = open && options.length === 0;
    const history = useHistory();
    const { workspaceId } = useParams();
    const { loading, data } = useQuery(GET_WORKSPACE_MEMBERS, {
        variables: { workspaceId },
    });
    // console.log(data);

    React.useEffect(() => {
        if (data?.getWorkspaceMembers) {
            setOptions(data.getWorkspaceMembers);
        }
    }, [data]);

    return (
        <Grid
            container
            justify="space-evenly"
            alignItems="center"
            style={{ width: "100%", padding: "10px" }}
        >
            <Grid item style={{ width: "20px" }}>
                <Typography align="center" variant="body2">
                    To:
                </Typography>
            </Grid>
            {/* style={{ width: "96%" }} */}
            <Grid item xs={11}>
                <Autocomplete
                    // style={{ width: 300 }}
                    id="receivers"
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    getOptionSelected={(option, value) => {
                        console.log(option, value);
                        if (option.name === value.name) {
                            history.push({
                                pathname: `/${workspaceId}/dm/${option.id}`,
                                state: { receiver: option },
                            });
                        }
                    }}
                    getOptionLabel={(option) => {
                        if (option.id === user.id) {
                            return `${option.name} (you)`;
                        }
                        return option.name;
                    }}
                    options={options}
                    loading={loading}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Type the name of a person"
                            fullWidth
                            InputProps={{
                                ...params.InputProps,
                                // startAdornment: "To:",
                                disableUnderline: true,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading && (
                                            <CircularProgress color="inherit" size={20} />
                                        )}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
}
