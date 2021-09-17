import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    deleteButton: {
        padding: "2px 5px",
        fontSize: "0.7rem",
        textTransform: "none"
    },
    links: {
        textDecoration: "none",
        color: theme.palette.info.main
    }
}))

const Boulder = ({ boulder }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    return (
        <div>
            <Typography gutterBottom>
                <Link to={{ pathname: `/show/${boulder._id}`, state: { boulder } }}
                    className={classes.links}
                >
                    {boulder.name}
                </Link>
                <span> in {boulder.location} - v{boulder.grade} </span>
            </Typography>

        </div >
    )
}

export default Boulder
