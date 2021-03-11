/* eslint-disable no-use-before-define */

import React from "react";
import { Checkbox, CircularProgress, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ items = [], loading }) {
    const usersSelected = [];
    // console.log(usersSelected);
    return (
        <Autocomplete
            multiple
            id="checkboxes-tags"
            loading={loading}
            options={items}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            // getOptionSelected={(option, value) => {
            //     // console.log(option, value);
            //     if (option.name === value.name) {
            //         usersSelected.push(value);
            //     }
            // }}
            renderOption={(option, { selected }) => (
                <React.Fragment>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.name}
                </React.Fragment>
            )}
            style={{ minWidth: 300 }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Enter name or email address"
                    InputProps={{
                        ...params.InputProps,
                        // startAdornment: "To:",
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
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//     { name: "The Shawshank Redemption", year: 1994 },
//     { name: "The Godfather", year: 1972 },
//     { name: "The Godfather: Part II", year: 1974 },
//     { name: "The Dark Knight", year: 2008 },
//     { name: "12 Angry Men", year: 1957 },
//     { name: "Schindler's List", year: 1993 },
//     { name: "Pulp Fiction", year: 1994 },
//     { name: "The Lord of the Rings: The Return of the King", year: 2003 },
//     { name: "The Good, the Bad and the Ugly", year: 1966 },
//     { name: "Fight Club", year: 1999 },
//     { name: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
//     { name: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
//     { name: "Forrest Gump", year: 1994 },
//     { name: "Inception", year: 2010 },
//     { name: "The Lord of the Rings: The Two Towers", year: 2002 },
//     { name: "One Flew Over the Cuckoo's Nest", year: 1975 },
//     { name: "Goodfellas", year: 1990 },
//     { name: "The Matrix", year: 1999 },
//     { name: "Seven Samurai", year: 1954 },
//     { name: "Star Wars: Episode IV - A New Hope", year: 1977 },
//     { name: "City of God", year: 2002 },
//     { name: "Se7en", year: 1995 },
//     { name: "The Silence of the Lambs", year: 1991 },
//     { name: "It's a Wonderful Life", year: 1946 },
//     { name: "Life Is Beautiful", year: 1997 },
//     { name: "The Usual Suspects", year: 1995 },
//     { name: "Léon: The Professional", year: 1994 },
//     { name: "Spirited Away", year: 2001 },
//     { name: "Saving Private Ryan", year: 1998 },
//     { name: "Once Upon a Time in the West", year: 1968 },
//     { name: "American History X", year: 1998 },
//     { name: "Interstellar", year: 2014 },
// ];
