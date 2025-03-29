import React, { useState, useEffect } from "react";
import "./navbar.css"
import SignUp from "../../page/signup";
import { Link, useNavigate } from "react-router-dom";

export const UniversalNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (i.e., token exists in localStorage)
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home or login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <img src="/logo.svg" alt="Grafene" />
          </div>
          <button
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <div className={`navbar-links ${isOpen ? "show" : ""}`}>
            <Link to="/" className="navbar-link">About</Link>

            {isLoggedIn ? (
              <>
                <Link to="/upload" className="navbar-link">Upload Project</Link>
                <button className="navbar-link logout-btn" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/signup" className="navbar-link">SignUp</Link>
                <Link to="/logIn" className="navbar-link">LogIn</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};