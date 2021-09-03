import React from 'react'
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        minHeight: "100vh",
        // minHeight: "calc(100vh - 64px)",
        marginBottom: "0px"
    }
}))

const Layout = ({ children }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {children}
        </div>
    )
}

export default Layout
