import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addCommentToBoulder } from "../features/boulders/bouldersThunks";
import { addComment } from "../features/comments/commentsThunks";
import { useParams, useHistory } from "react-router-dom";
import { Button, Card, CardHeader, CardContent, TextField, Container, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        minHeight: "calc(100vh - 64px)",
        width: "50%",
        padding: "100px"
    },
    card: {
        width: "100%"
    },
    cardHeader: {
        textAlign: "center",
        paddingBottom: "0px"
    },
    button: {
        backgroundColor: theme.palette.warning.main,
        textTransform: "none"
    }
}))

const AddComment = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();

    const currentUser = useSelector((state) => state.users.users)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(currentUser);
        dispatch(addComment({ comment: { title, body }, boulderId: id, userId: currentUser._id }))
        history.push("/index");
    }

    return (
        <Container className={classes.root}>
            <Card className={classes.card}>
                <CardHeader
                    className={classes.cardHeader}
                    title="add a new comment"
                />
                <CardContent>
                    <form action="" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="comment title"
                            margin="normal"
                            id="commentTitle"
                            name="commentTitle"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div>
                            <TextField
                                label="comment body"
                                variant="outlined"
                                fullWidth
                                multiline
                                margin="normal"
                                minRows="10"
                                id="commentBody"
                                name="commentBody"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                        </div>
                        <Button
                            className={classes.button}
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    )
}

export default AddComment
