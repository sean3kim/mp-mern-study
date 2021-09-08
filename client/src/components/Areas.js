import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAreas } from '../features/areas/areasSlice';

const Areas = () => {
    const dispatch = useDispatch();
    const allAreas = useSelector((state) => state.areas.areas);

    useEffect(() => {
    }, [])

    return (
        <div>
            {console.log("all areas", allAreas)}
            {allAreas.map((area, index) =>
                <div key={index}>
                    {area.name}
                </div>
            )}
        </div>
    )
}

export default Areas
