import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { Paper, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Comment from "./Comment";
import { deleteCommentFromBoulder, fetchOneBoulder } from "../features/boulders/bouldersSlice";

const useStyles = makeStyles({
    paper: {
        padding: "20px"
    }
})


const BoulderPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const classes = useStyles();

    useEffect(() => {
        dispatch(fetchOneBoulder(id));
    }, [])

    const boulderFromStore = useSelector((state) => {
        const foundBoulder = state.boulders.boulders.find((b) => b._id === id)
        return foundBoulder;
    })

    const handleDeleteComment = (commentId) => {
        dispatch(deleteCommentFromBoulder({ boulderId: boulderFromStore._id, commentId }))
    }

    return (
        <div>
            <Paper elevation={6} className={classes.paper} >

                {boulderFromStore &&
                    <div>
                        <Typography variant="h3">
                            {boulderFromStore.name}
                        </Typography>
                        <Typography>{boulderFromStore.tags.join(" ")}</Typography>
                        <Box mb={2}>
                            <Typography variant="h6">v{boulderFromStore.grade}</Typography>
                        </Box>
                        <Typography variant="h5">description</Typography>
                        <Typography variant="body1">{boulderFromStore.description}</Typography>

                        <Typography variant="h5" >comments</Typography>
                        <Link to={`/show/${boulderFromStore._id}/add_comment`}>add a comment</Link>

                        <div>
                            {boulderFromStore.comments.map((comment) => (
                                < Comment
                                    key={comment._id}
                                    comment={comment}
                                    onDeleteComment={handleDeleteComment}
                                />
                            ))}
                        </div>
                        <div>
                            <Link to={{ pathname: `/edit/${boulderFromStore._id}`, state: { boulder: boulderFromStore } }}>edit</Link>
                        </div>
                    </div>
                }
                <Link to="/index">back to index page</Link>
            </Paper>
        </div >
    )
}

export default BoulderPage
