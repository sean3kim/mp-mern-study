import React from 'react'
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";

const AreaPage = () => {
    const { area } = useParams();
    return (
        <div>
            <Typography>welcome to the area AreaPage</Typography>
            <Link to="/">back to index page</Link>
        </div>
    )
}

export default AreaPage
