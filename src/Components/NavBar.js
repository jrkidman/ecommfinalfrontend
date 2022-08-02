import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getUserToken } from '../Auth';
import { logoutUser } from '../Auth';
import { useState } from 'react';
import { useEffect } from 'react';

const NavBar = ({ isAuthLoading, setIsAuthLoading }) => {
    const [userToken, setUserToken] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const localUserToken = getUserToken()
        setUserToken(localUserToken)
    }, [isAuthLoading])

    return (
        <div>
            <nav>
                <h3>NavBar</h3>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {!userToken && <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/registration">Registration</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>

                    </>}
                </ul>
                {userToken &&
                    <>
                        <span><strong>You Are Logged In</strong></span>
                        <button
                            onClick={async () => {
                                setIsAuthLoading(true);
                                const logoutSuccess = await logoutUser();
                                if (logoutSuccess) {
                                    setIsAuthLoading(false);
                                    navigate('/');
                                }
                            }}
                        >
                            Logout
                        </button>
                    </>}
            </nav>
            <Outlet />

        </div>
    )
}

export default NavBar
