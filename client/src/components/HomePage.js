import React from 'react'
import { Link } from "react-router-dom";
import { Container, Typography, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
    },
    allBouldersButton: {
        backgroundColor: theme.palette.warning.main,
        textTransform: "none"
    },
    indexLink: {
        textDecoration: "none"
    }
}))

const HomePage = () => {
    const classes = useStyles();
    return (
        <div>
            <Container className={classes.root} maxWidth="xl">
                <Typography variant="h2">mp</Typography>
                <Typography>studying mern stack</Typography>
                <Link to="/index" className={classes.indexLink}>
                    <Button variant="contained" className={classes.allBouldersButton}>
                        to all boulders
                    </Button>
                </Link>

            </Container>
        </div>
    )
}

export default HomePage
