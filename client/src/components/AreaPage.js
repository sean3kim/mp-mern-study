import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { fetchOneArea, deleteArea } from "../features/areas/areasThunks";
import { makeStyles, Paper, Typography, Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "20px",
        margin: "40px"
    },
}))

const AreaPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchOneArea(id));
    })

    const area = useSelector((state) => {
        const foundArea = state.areas.areas.find((a) => a._id === id)
        return foundArea;
    })

    const handleDelete = () => {
        dispatch(deleteArea(area));
        history.push("/areas");
    }

    return (
        <Paper className={classes.paper}>
            {area &&
                <div>
                    {area.path.map((element) => <Typography key={element._id} display="inline">{element.name} &gt; </Typography>)}
                    <Typography variant="h4">{area.name}</Typography>
                </div>
            }
            <Link to={{ pathname: "/areas/new", state: { fromArea: area } }}>
                <Button>
                    add a new area
                </Button>
            </Link>
            <div >
                <Button
                    startIcon={<DeleteIcon />}
                    color="secondary"
                    variant="contained"
                    size="small"
                    onClick={handleDelete}
                >
                    delete
                </Button>
            </div>
        </Paper>
    )
}

export default AreaPage
