import React from 'react'
import { registerUser } from '../Auth'
import { loginUser } from '../Auth'
import { useNavigate } from 'react-router'
import { useState } from 'react'

const RegistrationPage = ({ isAuthLoading, setIsAuthLoading }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
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
                id="signup"
                type="submit"
                onClick={async () => {
                    setIsAuthLoading(true);
                    const isUserRegistered = await registerUser(username, password);

                    if (isUserRegistered) {
                        const isUserLoggedIn = await loginUser(username, password)
                        if (isUserLoggedIn) {
                            setIsAuthLoading(false)
                            navigate('/');
                        }
                    }
                }}>
                Register
            </button>


        </div>
    )
}

export default RegistrationPage
