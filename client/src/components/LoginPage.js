import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { loginUser } from "../features/users/usersSlice";
import { makeStyles, Card, CardHeader, CardContent, Container, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        minHeight: "calc(100vh - 64px)"
    },
    header: {
        paddingBottom: "0px",
        textAlign: "center"
    },
    content: {
        paddingTop: "5px",
    },
    loginButton: {
        backgroundColor: theme.palette.warning.main,
        textTransform: "none"
    }
}))

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const from = location.state && location.state.from;
    // const test = useRef(from)
    // const match = useRouteMatch();
    const classes = useStyles();

    const loginStatus = useSelector((state) => state.users.isLoggedIn);

    useEffect(() => {
        // console.log("match", match)
        // console.log("location state: ", location.state)
        // console.log("useref: ", test.current)
        // if (loginStatus && test.current) history.push(test.current);
        if (loginStatus) history.push("/index")
        // else if (loginStatus && !test.current) history.push("/index");
        else history.push("/login");
    }, [loginStatus])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
        setUsername("");
        setPassword("");
    }

    return (
        <Container className={classes.root}>
            <Card >
                <CardHeader className={classes.header} title="login" />
                <CardContent className={classes.content}>
                    <form action="" onSubmit={handleSubmit}>
                        <div>
                            <TextField
                                variant="outlined"
                                id="username"
                                label="username"
                                name="username"
                                value={username}
                                autoFocus
                                margin="normal"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                variant="outlined"
                                id="password"
                                label="password"
                                name="password"
                                type="password"
                                value={password}
                                margin="normal"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button className={classes.loginButton} variant="contained" type="submit" fullWidth>login</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    )
}

export default LoginPage
