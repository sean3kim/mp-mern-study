import React from 'react'
import { AppBar, Toolbar, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Search from "./Search";

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
    }
}))

const NavBar = () => {
    const classes = useStyles();
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
                    <div>
                        <Link href="/login" className={classes.loginLink} color="inherit">login</Link>
                    </div>
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default NavBar
