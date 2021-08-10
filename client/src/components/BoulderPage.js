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
    const location = useLocation();
    const { id } = useParams();
    const { boulder } = location.state;
    const classes = useStyles();

    // useEffect(() => {
    //     dispatch(fetchOneBoulder(id));
    // }, [])

    const boulderFromStore = useSelector((state) => {
        // console.log("url id", id)
        const test = state.boulders.boulders.find((b) => b._id === id)
        // console.log("test", test)
        return test
    })

    const handleDeleteComment = (commentId) => {
        dispatch(deleteCommentFromBoulder({ boulderId: boulder._id, commentId }))
    }

    return (
        <div>
            <Paper elevation={6} className={classes.paper} >
                <Typography variant="h3">
                    {boulder.name}
                </Typography>
                <Typography>{boulder.tags.join(" ")}</Typography>
                <Box mb={2}>
                    <Typography variant="h6">v{boulder.grade}</Typography>
                </Box>
                <Typography variant="h5">description</Typography>
                <Typography variant="body1">{boulder.description}</Typography>

                <Typography variant="h5" >comments</Typography>
                <Link to={`/show/${boulder._id}/add_comment`}>add a comment</Link>

                {/* {console.log(boulderFromStore)} */}
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
                    <Link to={{ pathname: `/edit/${boulder._id}`, state: { boulder } }}>edit</Link>
                </div>
                <Link to="/index">back to index page</Link>
            </Paper>
        </div >
    )
}

export default BoulderPage
