import React from 'react'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchFilter } from "../features/boulders/bouldersSlice";
import { useHistory } from "react-router-dom";

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchFilter(searchText));
        setSearchText("");
        history.push("/test");
    }

    return (
        <div>
            <form action="/test" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="search..."
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </form>
        </div>
    )
}

export default Search
