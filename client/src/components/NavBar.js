import React from 'react'
import { AppBar, Toolbar, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/users/usersSlice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: "sticky"
    },
    toolbar: theme.mixins.toolbar,
    toolBar: {
        backgroundColor: "#393D3F",
    },
    search: {
        position: "relative",
        marginLeft: "auto",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeLink: {
        "&:hover": {
            color: "#A9E190",
            textDecoration: "none"
        }
    },
    loginLink: {
        paddingLeft: "10px",
        "&:hover": {
            color: "#A9E190",
            textDecoration: "none"
        }
    },
    registerLink: {
        paddingLeft: "10px",
        "&:hover": {
            color: "#A9E190",
            textDecoration: "none"
        }
    },
    logoutLink: {
        paddingLeft: "10px",
        "&:hover": {
            color: "#A9E190",
            textDecoration: "none"
        }
    }
}))

const NavBar = () => {
    const classes = useStyles();
    const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
    const user = useSelector((state) => state.users.users);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logoutUser(user))
        history.push("/");
    }

    return (
        <div className={classes.root}>
            <div className={classes.toolbar} />
            <AppBar >
                <Toolbar className={classes.toolBar}>
                    <Typography>
                        <Link className={classes.homeLink} href="/" color="inherit">mp</Link>
                    </Typography>
                    <div className={classes.search} >
                        <Search />
                    </div>
                    {!isLoggedIn ?
                        <div>
                            <div>
                                <Link href="/login" className={classes.loginLink} color="inherit">login</Link>
                            </div>
                            <div>
                                <Link href="/register" className={classes.registerLink} color="inherit">register</Link>
                            </div>
                        </div> :
                        <Link href="" className={classes.logoutLink} color="inherit" onClick={handleLogout}>logout</Link>
                    }
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default NavBar
