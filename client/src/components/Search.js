import React from 'react'
import { useState } from "react";
import { useHistory } from "react-router-dom";

// search form
//   takes search input and redirects to url with the query string
//   searched component reads the query string and pulls from database
const Search = () => {
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
                <input
                    type="text"
                    placeholder="search..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </form>
        </div>
    )
}

export default Search
