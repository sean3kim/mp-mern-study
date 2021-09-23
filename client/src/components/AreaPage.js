import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { fetchOneArea, deleteArea } from "../features/areas/areasThunks";
import { makeStyles, Paper, Typography, Button } from "@material-ui/core";
import Boulder from "./Boulder";
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
    }, [])

    const area = useSelector((state) => state.areas.byId[id]);
    const areaBoulders = useSelector((state) => {
        let boulders = [];
        area &&
            area.boulders.forEach((boulderId) => {
                (boulderId in state.boulders.byId) && boulders.push(state.boulders.byId[boulderId]);
            })
        return boulders;
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
            {areaBoulders.map((boulder) => (
                <Boulder
                    key={boulder._id}
                    id={boulder._id}
                    boulder={boulder}
                />
            ))}
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
            <Typography>
                <Link to={{ pathname: "/new", state: { area } }} >
                    <Button
                        variant="contained"
                        size="small"
                    >
                        add a new boulder
                    </Button>
                </Link>
            </Typography>
        </Paper>
    )
}

export default AreaPage
