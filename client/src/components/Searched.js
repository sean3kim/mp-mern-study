import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { searchBoulderName } from "../features/boulders/bouldersThunks";
import { makeStyles, Container, Paper, Typography } from "@material-ui/core";
import Boulder from "./Boulder";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
        minHeight: "calc(100vh - 64px)",
        width: "75%",
        padding: "100px"
    },
    paper: {
        width: "100%",
        padding: "20px"
    },
    link: {
        color: theme.palette.info.main,
        textDecoration: "none",
        fontFamily: theme.typography.fontFamily,
    },
    linkSpacing: {
        marginTop: "20px"
    }
}))

const Searched = () => {
    const dispatch = useDispatch();
    const searchedBoulders = useSelector((state) => state.boulders.searchedFilter);
    const { search } = useLocation();
    const classes = useStyles();

    useEffect(() => {
        dispatch(searchBoulderName(search));
    }, [])

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                {searchedBoulders.map((boulder) => (
                    <Boulder
                        key={boulder._id}
                        id={boulder._id}
                        boulder={boulder}
                    />
                ))}
                <Typography className={classes.linkSpacing}>
                    <Link className={classes.link} to={{ pathname: "/", state: { fromSearch: true } }}>back to home</Link>
                </Typography>
            </Paper>
        </Container>
    )
}

export default Searched
