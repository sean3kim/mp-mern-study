import React, { useEffect, useState } from 'react'
import axios from "axios";

const SecretPage = () => {
    const [test, setTest] = useState("");
    useEffect(() => {
        const testing = async () => {
            const { data } = await axios.get("http://localhost:5000/secret", { withCredentials: true })
            setTest(data)
        }
        testing()

    })
    return (
        <div>
            {test}
        </div>
    )
}

export default SecretPage
