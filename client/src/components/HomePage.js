import React from 'react'
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const HomePage = () => {
    return (
        <div>
            <Typography>welcome to the homepage</Typography>
            <Link to="/index">to all boulders</Link>

        </div>
    )
}

export default HomePage