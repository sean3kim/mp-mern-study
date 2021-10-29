import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
        color: theme.palette.info.main
    },
    newArea: {
        backgroundColor: theme.palette.warning.main,
        textTransform: "none",
        marginTop: "5px"
    }
}))

const Areas = () => {
    // const dispatch = useDispatch();
    const allAreas = useSelector((state) => Object.values(state.areas.byId));
    const classes = useStyles();


    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h3" className={classes.header} align="center">these are all the areas so far</Typography>
                {allAreas.map((area, index) =>
                    <div key={index}>
                        <Typography>
                            <Link to={`/areas/show/${area._id}`} className={classes.links}>{area.name}</Link>
                        </Typography>
                    </div>
                )}
                <Typography>
                    <Link to="/areas/new" className={classes.links}>
                        <Button
                            className={classes.newArea}
                            variant="contained"
                            size="small"
                        >
                            add a new area
                        </Button>
                    </Link>
                </Typography>
                {/* <Link to="/areas/new">add an area</Link> */}
            </Paper>
        </Container>
    )
}

export default Areas
