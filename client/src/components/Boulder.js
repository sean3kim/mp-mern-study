import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBoulder } from "../features/boulders/bouldersSlice";

const Boulder = ({ boulder }) => {
    const dispatch = useDispatch();
    return (
        <div>
            <li>{boulder.name} in {boulder.location} - v{boulder.grade}
                <button onClick={() => dispatch(deleteBoulder(boulder._id))}>delete</button>
                <Link to={`/edit/${boulder._id}`}> edit</Link>
                <Link to={{ pathname: `/show/${boulder._id}`, state: { boulder } }}>details</Link>
            </li>
        </div >
    )
}

export default Boulder
