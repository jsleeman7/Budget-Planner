import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ authenticate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleLogin = () => {
    if (username === "p1" && password === "1212b5n") {
      // If credentials are correct, call the authenticate function passed as prop
      authenticate();
      // Navigate to the home page after successful login
      navigate("/");
    } else {
      // If credentials are incorrect, display error message
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: "400px" }}>
        <h2 className="mb-3 text-center">ExpenseHelp</h2>
        <h3 className="mb-3 text-center">Sign In</h3>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3 text-danger">{error}</div>
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
