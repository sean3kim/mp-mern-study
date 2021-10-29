import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory, Link } from "react-router-dom"
import { makeStyles, Container, Paper, TextField, Button, Typography } from "@material-ui/core";
import { addArea } from "../features/areas/areasThunks";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        minHeight: "calc(100vh - 64px)",
        width: "75%",
        padding: "100px"
    },
    paper: {
        width: "100%",
        padding: "20px"
    },
    button: {
        backgroundColor: theme.palette.warning.main,
        marginBottom: "10px",
        textTransform: "none"
    },
    indexLink: {
        color: theme.palette.info.main,
        textDecoration: "none",
        fontFamily: theme.typography.fontFamily
    },
}))

const AddArea = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [boulders, setBoulders] = useState([]);
    const [path, setPath] = useState([]);
    const [parent, setParent] = useState(null);

    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const fromArea = location.state && location.state.fromArea;
    const classes = useStyles();

    useEffect(() => {
        if (fromArea) {
            setPath([...fromArea.path, { _id: fromArea._id, name: fromArea.name }]);
            setParent({ _id: fromArea._id, name: fromArea.name })
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addArea({
            name,
            description,
            boulders,
            path,
            parent,
        }))
        history.push("/areas");
    }

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Typography align="center" variant="h4">add a new area</Typography>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            variant="outlined"
                            label="area name"
                            fullWidth
                            margin="normal"
                            id="areaName"
                            name="areaName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            label="area description"
                            variant="outlined"
                            fullWidth
                            multiline
                            margin="normal"
                            minRows="10"
                            id="areaDescription"
                            name="areaDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button
                            className={classes.button}
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            add area
                        </Button>
                    </div>
                </form>
                <Link className={classes.indexLink} to="/">back to home page</Link>
            </Paper>
        </Container>
    )
}

export default AddArea
