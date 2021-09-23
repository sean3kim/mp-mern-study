import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, ...rest }) => {
    const loginStatus = useSelector((state) => state.users.isLoggedIn)
    return (
        <Route
            {...rest}
            render={({ location }) => loginStatus ? children : <Redirect to={{ pathname: "/login", state: { from: location } }} />}
        >

        </Route>
    )
}

export default ProtectedRoute
