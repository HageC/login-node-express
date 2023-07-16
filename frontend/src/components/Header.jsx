import React from "react";
import "../styles/Header.css";
const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="header">
        <div className="header-logo">
          <a href="https://github.com/HageC/login-node-express" target="_blank">
            Login-Node-Express
          </a>
        </div>
        <div>
          <ul className="header-links">
            <li className="link-item">Home</li>
            <li className="link-item">About</li>
            <li className="link-item">Contact</li>
          </ul>
        </div>

        <div>
          <ul className="header-btns">
            <button className="btn-login">Login</button>
            <button className="btn-signup">Sign up</button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
