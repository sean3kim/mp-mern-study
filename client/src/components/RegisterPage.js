import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { registerUser } from "../features/users/usersSlice";
import { useHistory } from "react-router-dom";
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

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ username, password, email }))
        history.push("/index");
    }

    return (
        <Container className={classes.root}>
            <Card>
                <CardHeader className={classes.header} title="register" />
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
                                id="email"
                                label="email"
                                name="email"
                                type="email"
                                value={email}
                                margin="normal"
                                onChange={(e) => setEmail(e.target.value)}
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
                        <Button className={classes.loginButton} variant="contained" type="submit" fullWidth >register</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    )
}

export default RegisterPage
