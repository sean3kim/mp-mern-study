import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom"
import { makeStyles, Container, Paper, TextField, Button, Typography } from "@material-ui/core";
import { addArea } from "../features/areas/areasThunks";

const AddArea = () => {
    const [name, setName] = useState("");
    const [boulders, setBoulders] = useState([]);
    const [path, setPath] = useState([]);
    const [parent, setParent] = useState(null);

    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const fromArea = location.state && location.state.fromArea;

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
            boulders,
            path,
            parent,
        }))
        history.push("/areas");
    }

    return (
        <Container>
            <Paper>
                <Typography>add a new area</Typography>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            variant="outlined"
                            label="area name"
                            margin="normal"
                            id="areaName"
                            name="areaName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <Button type="submit">add area</Button>
                </form>
            </Paper>
        </Container>
    )
}

export default AddArea
