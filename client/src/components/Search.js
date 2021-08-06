import React from 'react'
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    textInput: {
        backgroundColor: "white",
        borderRadius: theme.shape.borderRadius,
    },
}))

// search form
//   takes search input and redirects to url with the query string
//   searched component reads the query string and pulls from database
const Search = () => {
    const classes = useStyles();
    const [searchText, setSearchText] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search?s=${searchText}`);
        setSearchText("");
    }

    return (
        <div>
            <form action="/search" onSubmit={handleSubmit}>
                <div>
                    <SearchIcon fontSize="large" />
                    <TextField
                        className={classes.textInput}
                        variant="outlined"
                        size="small"
                        placeholder="search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)} />
                </div>
            </form>
        </div>
    )
}

export default Search
