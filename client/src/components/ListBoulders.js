import React from 'react'
import Boulder from "./Boulder"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ListBoulders = () => {
    const allBoulders = useSelector((state) => state.boulders.boulders)
    return (
        <div>
            {allBoulders.map((boulder) => (
                <Boulder
                    key={boulder._id}
                    id={boulder._id}
                    boulder={boulder}
                />
            ))}
            <Link to="/new">add a new boulder</Link>
        </div>
    )
}

export default ListBoulders
