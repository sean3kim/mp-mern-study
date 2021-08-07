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
                <Typography>{boulder.tags.join(" ")}</Typography>
                <Box mb={2}>
                    <Typography variant="h6">v{boulder.grade}</Typography>
                </Box>
                <Typography variant="h5">description</Typography>
                <Typography variant="body1">{boulder.description}</Typography>

                <Typography variant="h5" >comments</Typography>

                <div>
                    <Link to={{ pathname: `/edit/${boulder._id}`, state: { boulder } }}>edit</Link>
                </div>
                <Link to="/">back to home page</Link>
            </Paper>
        </div >
    )
}

export default BoulderPage
