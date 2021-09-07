import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBoulder } from "../features/boulders/bouldersSlice";
import { Button, Typography, makeStyles } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

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
                {/* <Button
                    className={classes.deleteButton}
                    startIcon={<DeleteIcon />}
                    color="secondary"
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(deleteBoulder(boulder._id))}>
                    delete
                </Button> */}
            </Typography>

        </div >
    )
}

export default Boulder
