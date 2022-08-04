import React from 'react'
import { registerUser } from '../Auth'
import { loginUser } from '../Auth'
import { useNavigate } from 'react-router'
import { useState } from 'react'

const RegistrationPage = ({ isAuthLoading, setIsAuthLoading }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    return (
        <div>
            {/* text input */}
            <label>Email:</label>
            <input
                type="text"
                value={email}
                onChange={(event) => {
                    const newEmail = event.target.value;
                    setEmail(newEmail);
                }}>
            </input>
            <br></br>
            <br></br>

            {/* text input */}
            <label>Password:</label>
            <input
                type="password"
                // value={password}
                onChange={(event) => {
                    const newPassword = event.target.value;
                    setPassword(newPassword);
                }}>
            </input>
            <br></br>
            <br></br>

            {/* text input */}
            {/* <label>Confirm Password:</label>
            <input
                type="password"
                // value={password}
                onChange={(event) => {
                    const newPassword = event.target.value;
                    setPassword(newPassword);
                }}>
            </input>
            <br></br>
            <br></br> */}


            <button
                id="signup"
                type="submit"
                onClick={async () => {
                    setIsAuthLoading(true);
                    const isUserRegistered = await registerUser(email, password);
                    if (isUserRegistered) {
                        const isUserLoggedIn = await loginUser(email, password)
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
