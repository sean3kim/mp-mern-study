import React, { useEffect } from 'react'
import Boulder from "./Boulder"
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearFilter } from "../features/boulders/bouldersSlice";

const ListBoulders = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const fromSearch = location.state;

    const allBoulders = useSelector((state) => state.boulders.boulders);

    useEffect(() => {
        if (fromSearch) dispatch(clearFilter());
    })

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
