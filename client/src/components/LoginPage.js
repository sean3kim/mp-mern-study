import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../features/users/usersSlice";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = () => {
        dispatch(loginUser({ username, password }));
        history.push("/index");
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
