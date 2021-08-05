import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchBoulderName } from "../features/boulders/bouldersSlice";
import Boulder from "./Boulder";

const Searched = () => {
    const dispatch = useDispatch();
    const searchedBoulders = useSelector((state) => state.boulders.searchedFilter);
    const { search } = useLocation();

    useEffect(() => {
        dispatch(searchBoulderName(search));
    }, [])

    return (
        <div>
            {searchedBoulders.map((boulder) => (
                <Boulder
                    key={boulder._id}
                    id={boulder._id}
                    boulder={boulder}
                />
            ))}
        </div>
    )
}

export default Searched
