import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../features/users/usersSlice";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();

    const loginStatus = useSelector((state) => state.users.isLoggedIn);

    useEffect(() => {
        if (loginStatus) history.push("/index");
        else history.push("/login");
    }, [loginStatus])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
        setUsername("");
        setPassword("");
        // history.push("/index");
        // if (loginStatus) history.push("/index");
        // else history.push("/login");
    }

    return (
        <div>
            <h1>login</h1>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button>login</button>
            </form>
        </div>
    )
}

export default LoginPage
