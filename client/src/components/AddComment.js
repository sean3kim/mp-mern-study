import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addCommentToBoulder } from "../features/boulders/bouldersSlice";
import { useParams, useHistory } from "react-router-dom";

const AddComment = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const currentUser = useSelector((state) => state.users.users)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(currentUser);
        dispatch(addCommentToBoulder({ comment: { title, body }, boulderId: id, userId: currentUser._id }))
        history.push("/index");
    }

    return (
        <div>
            add a new comment here


            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">comment title</label>
                <input type="text"
                    placeholder="comment title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />

                <div>
                    <textarea
                        name="commentBody"
                        id="commentBody"
                        cols="30"
                        rows="10"
                        placeholder="add a comment"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    >
                        add a comment
                    </textarea>
                </div>
                <button>submit</button>
            </form>
        </div>
    )
}

export default AddComment
