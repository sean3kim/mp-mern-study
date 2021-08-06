import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { Paper, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    paper: {
        padding: "20px"
    }
})

const BoulderPage = () => {
    const location = useLocation();
    const { boulder } = location.state;
    const classes = useStyles();

    return (
        <div>
            <Paper elevation={6} className={classes.paper} >
                <Typography variant="h3">
                    {boulder.name}
                </Typography>
                <Box mb={2}>
                    <Typography variant="h6">v{boulder.grade}</Typography>
                </Box>
                <Typography variant="h5">Description</Typography>

                <Typography variant="h5" >comments</Typography>

                <Link to="/">back to home page</Link>
            </Paper>
        </div >
    )
}

export default BoulderPage
