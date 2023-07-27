import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const { pathname } = useLocation();
  const [login, setLogin] = useState(pathname === "/login" ? true : false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (login) {
      console.log("Login");
    } else {
      console.log("Signup");
    }
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <form className="login-form">
          <h2 className="form-header">{login ? "Login" : "Register"}</h2>
          {login || (
            <>
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                autoComplete="true"
                type="text"
                id="name"
                placeholder="Enter your name"
              />
            </>
          )}
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            autoComplete="true"
            type="text"
            id="email"
            placeholder="Enter your email"
          />
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            autoComplete="true"
            type="password"
            id="password"
            placeholder="Enter your password"
          />

          <button className="form-btn" onClick={handleSubmit}>
            Submit
          </button>

          <p className="form-switch">
            {login ? "Don't have an account?" : "Already have an account?"}
            <span onClick={() => setLogin(!login)}>
              {login ? " Register here" : " Login here"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
