import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { resetStatus } from "../features/boulders/bouldersSlice";

const ErrorPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(resetStatus());
    }, [])
    return (
        <div>
            error page
        </div>
    )
}

export default ErrorPage
