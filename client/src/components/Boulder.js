import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBoulder } from "../features/boulders/bouldersSlice";

const Boulder = ({ boulder }) => {
    const dispatch = useDispatch();
    return (
        <div>
            <Link to={{ pathname: `/show/${boulder._id}`, state: { boulder } }}>
                {boulder.name} in {boulder.location} - v{boulder.grade}
                <button onClick={() => dispatch(deleteBoulder(boulder._id))}>delete</button>
            </Link>
            {/* <Link to={`/edit/${boulder._id}`}> edit</Link> */}

        </div >
    )
}

export default Boulder
