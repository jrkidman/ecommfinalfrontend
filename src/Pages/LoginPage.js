import React from "react";
import { useAuth } from "../Hooks/Auth";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const { login } = useAuth();
  return (
    <div>
      <h3>{loginMessage}</h3>
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
        value={password}
        onChange={(event) => {
          const newPassword = event.target.value;
          setPassword(newPassword);
        }}
      ></input>
      <br></br>
      <br></br>

      <button
        id="login"
        type="submit"
        onClick={async () => {
          const loginResult = await login(email, password);
          if (!loginResult.success) {
            setLoginMessage(loginResult.message);
          }
        }}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
