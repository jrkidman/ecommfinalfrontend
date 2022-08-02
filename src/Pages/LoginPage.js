import React from 'react'
import { useNavigate } from 'react-router';
import { loginUser } from '../Auth';
import { useState } from 'react';

const LoginPage = ({ setIsAuthLoading }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div>
            {/* text input */}
            <label>Username:</label>
            <input
                type="text"
                value={username}
                onChange={(event) => {
                    const newUsername = event.target.value;
                    setUsername(newUsername);
                }}>
            </input>
            <br></br>
            <br></br>

            {/* text input */}
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(event) => {
                    const newPassword = event.target.value;
                    setPassword(newPassword);
                }}>
            </input>
            <br></br>
            <br></br>

            <button
                id="login"
                type="submit"
                onClick={async () => {
                    setIsAuthLoading(true);
                    const isUserLoggedIn = await loginUser(username, password)
                    if (isUserLoggedIn) {
                        setIsAuthLoading(false);
                        navigate('/')
                    }
                }}>
                Login
            </button>


        </div>
    )
}

export default LoginPage
