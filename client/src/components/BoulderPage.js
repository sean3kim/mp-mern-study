import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { Paper, Typography, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Comment from "./Comment";
import { deleteCommentFromBoulder, fetchOneBoulder } from "../features/boulders/bouldersThunks";
import { deleteComment } from "../features/comments/commentsThunks";
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteBoulder } from "../features/boulders/bouldersThunks";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "20px",
        margin: "40px"
    },
    addCommentButton: {
        textTransform: "none",
        backgroundColor: theme.palette.warning.main,
        marginTop: "20px"
    },
    addCommentLink: {
        textDecoration: "none",
        color: "black"
    },
    editButton: {
        textTransform: "none",
    },
    editLink: {
        textDecoration: "none",
        color: "white"
    },
    spacing: {
        margin: "30px 0px"
    },
    index: {
        color: theme.palette.info.main,
        textDecoration: "none",
        fontFamily: theme.typography.fontFamily
    },
    indexSpacing: {
        marginTop: "30px"
    },
    deleteButton: {
        textTransform: "none",
        marginLeft: "5px",
        marginRight: "5px"
    },
}))


const BoulderPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const classes = useStyles();

    useEffect(() => {
        dispatch(fetchOneBoulder(id));
    }, [])

    const boulderFromStore = useSelector((state) => {
        const foundBoulder = state.boulders.boulders.find((b) => b._id === id)
        return foundBoulder;
    });
    const boulderComments = useSelector((state) => {
        // have the comment ids from the boulder
        // need to get all comments that match the id from the state
        let comments = [];
        boulderFromStore &&
            boulderFromStore.comments.forEach((commentId) => {
                (commentId in state.comments.byId) && comments.push(state.comments.byId[commentId]);
            })
        return comments;
    })
    const currentUser = useSelector((state) => state.users.users)

    const handleDeleteComment = (commentId) => {
        if (currentUser) {
            dispatch(deleteComment({
                boulderId: boulderFromStore._id,
                commentId,
                userId: currentUser._id
            }))
        } else {
            history.push("/login");
        }
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
                            <Typography variant="body1">submitted by: {boulderFromStore.user.username}</Typography>
                        </Box>
                        <Typography variant="h5">description</Typography>
                        <Typography variant="body1">{boulderFromStore.description}</Typography>

                        <Typography className={classes.spacing} variant="h5" >comments</Typography>

                        <div>
                            {boulderComments.map((comment) => (
                                < Comment
                                    key={comment._id}
                                    comment={comment}
                                    onDeleteComment={handleDeleteComment}
                                />
                            ))}
                        </div>
                        <Button className={classes.addCommentButton} variant="contained" size="small">
                            <Link className={classes.addCommentLink} to={`/show/${boulderFromStore._id}/add_comment`}>add a comment</Link>
                        </Button>
                        {(currentUser && currentUser._id === boulderFromStore.user._id) &&
                            <div className={classes.spacing}>
                                <Button className={classes.editButton} variant="contained" size="small" color="primary">
                                    <Link className={classes.editLink} to={{ pathname: `/edit/${boulderFromStore._id}`, state: { boulder: boulderFromStore } }}>edit</Link>
                                </Button>
                                <Button
                                    className={classes.deleteButton}
                                    startIcon={<DeleteIcon />}
                                    color="secondary"
                                    variant="contained"
                                    size="small"
                                    onClick={() => {
                                        dispatch(deleteBoulder(boulderFromStore._id))
                                        history.push("/index")
                                    }}>
                                    delete
                                </Button>
                            </div>
                        }
                    </div>
                }
                <Typography className={classes.indexSpacing}>
                    <Link className={classes.index} to="/index">back to index page</Link>
                </Typography>
            </Paper>
        </div >
    )
}

export default BoulderPage
