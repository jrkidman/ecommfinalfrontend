import React, { Children, useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/Auth";

const NavBar = () => {
  const { user, email, logout, scope } = useAuth();

  return (
    <div id="navdiv">
      <nav className="navbar">
        {/* IF the user does not exist, or no user is logged in, display these links in the navbar */}
        {!user && (
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/registration">Register</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        )}

        {/* IF the user exists, and is logged in... display these links in the navbar. */}
        {user && (
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {scope === "admin" && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <br />
            <span>
              {/* How do we access the user.email key value to display the logged in user?? */}
              <strong>Currently Logged In As: {email}</strong>
            </span>
            <br />
            <button
              // On click, button will run logout function pulled from Auth.js with useAuth context hook
              onClick={async () => {
                await logout();
              }}
            >
              Logout
            </button>
          </ul>
        )}
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;
