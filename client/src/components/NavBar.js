import React from 'react'
import { AppBar, Toolbar, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/users/usersThunks";
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
    userLinkTexts: {
        paddingLeft: "10px",
    },
    userLinks: {
        "&:hover": {
            color: theme.palette.primary.main,
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
                                <Typography className={classes.userLinkTexts}>
                                    <Link href="/login" className={classes.userLinks} color="inherit">login</Link>
                                </Typography>
                            </div>
                            <div>
                                <Typography className={classes.userLinkTexts}>
                                    <Link href="/register" className={classes.userLinks} color="inherit">register</Link>
                                </Typography>
                            </div>
                        </div> :
                        <Typography className={classes.userLinkTexts}>
                            <Link href="" className={classes.userLinks} color="inherit" onClick={handleLogout}>logout</Link>
                        </Typography>
                    }
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default NavBar
