import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Areas = () => {
    // const dispatch = useDispatch();
    const allAreas = useSelector((state) => Object.values(state.areas.byId));


    return (
        <div>
            {allAreas.map((area, index) =>
                <div key={index}>
                    <Link to={`/areas/show/${area._id}`}>{area.name}</Link>
                </div>
            )}
            <Link to="/areas/new">add an area</Link>
        </div>
    )
}

export default Areas
