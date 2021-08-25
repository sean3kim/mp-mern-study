import React from 'react'

const Comment = ({ comment, onDeleteComment }) => {

    return (
        <div>
            <h3>{comment.title}</h3>
            <p>by: {comment.author.username}</p>
            <p>{comment.body}</p>
            <button onClick={() => onDeleteComment(comment._id)}>delete</button>
        </div>
    )
}

export default Comment
