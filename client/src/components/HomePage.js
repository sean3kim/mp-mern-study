import React from 'react'
import { Link } from "react-router-dom";
import { Container, Typography, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        minHeight: "calc(100vh - 64px)",
    },
    allBouldersButton: {
        backgroundColor: theme.palette.warning.main,
        textTransform: "none",
    },
    homeLink: {
        textDecoration: "none",
    },
    spacing: {
        marginTop: "10px"
    }
}))

const HomePage = () => {
    const classes = useStyles();
    return (
        <div>
            <Container className={classes.root} maxWidth="xl">
                <Typography variant="h2">mp</Typography>
                <Typography>studying mern stack</Typography>
                <Link to="/index" className={classes.homeLink}>
                    <Button variant="contained" className={classes.allBouldersButton}>
                        to all boulders
                    </Button>
                </Link>
                <div className={classes.spacing}>
                    <Link to="/areas" className={classes.homeLink}>
                        <Button variant="contained" className={classes.allBouldersButton}>
                            to all areas
                        </Button>
                    </Link>
                </div>

            </Container>
        </div>
    )
}

export default HomePage
