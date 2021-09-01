import React, { useEffect } from 'react'
import Boulder from "./Boulder"
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearFilter } from "../features/boulders/bouldersSlice";
import { Container, makeStyles, Typography, Paper, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "30px"
    },
    paper: {
        padding: "30px"
    },
    header: {
        marginBottom: "20px"
    },
    links: {
        textDecoration: "none",
    },
    newBoulder: {
        backgroundColor: theme.palette.warning.main,
        textTransform: "none",
        marginTop: "5px"
    }
}))

const ListBoulders = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const fromSearch = location.state;
    const classes = useStyles();

    const allBoulders = useSelector((state) => state.boulders.boulders);

    useEffect(() => {
        if (fromSearch) dispatch(clearFilter());
    }, [allBoulders])

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h3" className={classes.header} align="center">these are all the boulders so far</Typography>
                {allBoulders.map((boulder) => (
                    <Boulder
                        key={boulder._id}
                        id={boulder._id}
                        boulder={boulder}
                    />
                ))}
                <Typography>
                    <Link to="/new" className={classes.links}>
                        <Button
                            className={classes.newBoulder}
                            variant="contained"
                            size="small"
                        >
                            add a new boulder
                        </Button>
                    </Link>
                </Typography>
            </Paper>
        </Container>
    )
}

export default ListBoulders
