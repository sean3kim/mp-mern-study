import React from 'react'
import { Link } from "react-router-dom";

const Boulder = ({ boulder, onDelete }) => {
    return (
        <div>
            <li>{boulder.name} in {boulder.location} - v{boulder.grade}
                <button onClick={() => onDelete(boulder._id)}>delete</button>
                <Link to={`/edit/${boulder._id}`}> edit</Link>
            </li>
        </div >
    )
}

export default Boulder
