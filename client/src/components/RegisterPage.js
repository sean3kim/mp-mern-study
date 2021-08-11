import React, { useState } from 'react'

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <h1>register</h1>
            <form action="">
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
            </form>
        </div>
    )
}

export default RegisterPage
