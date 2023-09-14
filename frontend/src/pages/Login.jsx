import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useGlobalContext } from "../context/globalState";

const Login = () => {
  const { user, handle_login_register, loading } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);
  const { pathname } = useLocation();
  const [login, setLogin] = useState(pathname === "/login" ? true : false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handle_login_register(login, formValues);
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  if (!loading) {
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
                  value={formValues.name}
                  onChange={handleChange}
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
              value={formValues.email}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              autoComplete="true"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formValues.password}
              onChange={handleChange}
            />

            <button className="form-btn" onClick={handleSubmit}>
              Submit
            </button>

            <p className="form-switch">
              {login ? "Don't have an account?" : "Already have an account?"}
              <span
                onClick={() => {
                  setLogin(!login);
                  setFormValues({ name: "", email: "", password: "" });
                }}
              >
                {login ? " Register here" : " Login here"}
              </span>
            </p>
          </form>
        </div>
      </div>
    );
  }
};

export default Login;
