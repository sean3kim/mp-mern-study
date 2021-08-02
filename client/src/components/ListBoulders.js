import React from 'react'
import Boulder from "./Boulder"
import { Link } from "react-router-dom";

const ListBoulders = ({ allBoulders, onDelete }) => {
    return (
        <div>
            {allBoulders.map((boulder) => (
                <Boulder
                    key={boulder._id}
                    id={boulder._id}
                    boulder={boulder}
                    onDelete={onDelete}
                />
            ))}
            <Link to="/new">add a new boulder</Link>
        </div>
    )
}

export default ListBoulders
