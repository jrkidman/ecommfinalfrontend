import React, { Children } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/Auth";

const NavBar = ({ isAuthLoading, setIsAuthLoading }) => {
  const { user, logout, scope } = useAuth();
  // console.log({ scope });

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
              <Link to="/registration">Registration</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        )}

        {/* IF the user exists, and is logged in... display these links in the navbar. */}
        {user && scope === "admin" && (
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
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
              <strong>Currently Logged In As: {}</strong>
            </span>
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
        {/* IF the user exists, and is logged in... display these links in the navbar. */}
        {user && scope === "user" && (
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
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
              <strong>Currently Logged In As: {}</strong>
            </span>
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
