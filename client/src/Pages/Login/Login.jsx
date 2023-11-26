import React, { useState } from "react";
import "./login.css";
import { jwtDecode } from "jwt-decode";

function Login() {
  // State variables for login form
  const [isLoginFormShown, setIsLoginFormShown] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  // Switch between login and signup forms
  const handleSignupClick = () => {
    setIsLoginFormShown(false);
  };

  const handleLoginClick = () => {
    setIsLoginFormShown(true);
  };

  // Register function
  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      // Send registration request to the server
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      // Handle errors in the response
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      // Extract token and user ID from the response
      const data = await response.json();
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("Id", data.user);

      // Decode the JWT token
      const decodedToken = jwtDecode(data.token);

      // Display success message and redirect to messenger page
      alert("You have registered successfully");
      window.location.href = "/messenger";

      console.log("Registration successful");
    } catch (error) {
      // Handle registration errors
      setError(error.message);
      console.error(error);
      // Show error alert
      alert("Registration failed");
    }
  };

  // Login function
  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      // Send login request to the server
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Handle errors in the response
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      // Extract token and user ID from the response
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("Id", data.user);

      // Decode the JWT token
      const decodedToken = jwtDecode(data.token);

      // Display success message and redirect to messenger page
      alert("You have logged in successfully");
      window.location.href = "/messenger";

      console.log("Login successful");
    } catch (error) {
      // Handle login errors
      setError(error.message);
      console.error(error);
      // Show error alert
      alert("Log in failed");
    }
  };

  return (
    <div className="login-all">
      <div className="login-body">
        <div className="login-container">
          <div
            className={`login-slider ${
              isLoginFormShown ? "" : "movelogin-slider"
            }`}
          ></div>
          <div className="login-btn">
            <button
              className={`login-login ${isLoginFormShown ? "active" : ""}`}
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className={`login-signup ${isLoginFormShown ? "" : "active"}`}
              onClick={handleSignupClick}
            >
              Sign up
            </button>
          </div>

          <div
            className={`login-form-section ${
              isLoginFormShown ? "" : "login-form-section-move"
            }`}
          >
            {/* Login Form */}
            <form onSubmit={handleLogin} className="login-login-box">
              <input
                autoComplete="off"
                type="email"
                className="login-email ele"
                placeholder="youremail@email.com"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                autoComplete="off"
                type="password"
                className="login-password ele"
                placeholder="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {error && (
                <p className="error-message">Invalid Credentials</p>
              )}
              <button className="login-clkbtn">Login</button>
            </form>

            {/* Signup Form */}
            <form onSubmit={handleRegister} className="login-signup-box">
              <input
                autoComplete="off"
                type="text"
                className="login-name ele"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                autoComplete="off"
                type="email"
                className="login-email ele"
                placeholder="youremail@email.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                autoComplete="off"
                type="password"
                className="login-password ele"
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="error-message"> {error}</p>}
              <button className="login-clkbtn">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
