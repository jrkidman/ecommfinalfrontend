import React from "react";
import { useAuth } from "../Hooks/Auth";
import { useNavigate } from "react-router";
import { useState } from "react";

const RegistrationPage = ({ isAuthLoading, setIsAuthLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, register } = useAuth();
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
        }}
      ></input>
      <br></br>
      <br></br>

      {/* text input */}
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          const newPassword = event.target.value;
          setPassword(newPassword);
        }}
      ></input>
      <br></br>
      <br></br>

      {/* text input */}
      {/* <label>Confirm Password:</label>
      <input
        type="password"
        onChange={(event) => {
          const newPassword = event.target.value;
          setPassword(newPassword);
        }}
      ></input> */}
      <br></br>
      <br></br>

      <button
        id="signup"
        type="submit"
        onClick={async () => {
          const isUserRegistered = await register(email, password);

          if (isUserRegistered) {
            const isUserLoggedIn = await login(email, password);
          }
        }}
      >
        Register
      </button>
    </div>
  );
};

export default RegistrationPage;
