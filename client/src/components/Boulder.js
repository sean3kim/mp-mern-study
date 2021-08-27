import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBoulder } from "../features/boulders/bouldersSlice";
import { Button, Typography } from "@material-ui/core";

const Boulder = ({ boulder }) => {
    const dispatch = useDispatch();
    return (
        <div>
            <Typography>
                <Link to={{ pathname: `/show/${boulder._id}`, state: { boulder } }}>
                    {boulder.name}
                </Link>
                <span> in {boulder.location} - v{boulder.grade} </span>
                <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(deleteBoulder(boulder._id))}>
                    delete
                </Button>
            </Typography>

        </div >
    )
}

export default Boulder
