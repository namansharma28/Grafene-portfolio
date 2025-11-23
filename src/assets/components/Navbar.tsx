import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import "./navbar.css"
import SignUp from "../../page/signup";
import { Link, useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
        <div className="navbar-logo">
          <img src="/logo.svg" alt="Grafene" />
        </div>
          <button 
            className={`hamburger ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <div className={`navbar-links ${isOpen ? 'show' : ''}`}>
            <a href="#hero" className="navbar-link">
              Home
            </a>
            <a href="#about" className="navbar-link">
              About
            </a>
            <a href="#projects" className="navbar-link">
              Projects
            </a>
            <a href="#contact" className="navbar-link">
              Contact
            </a>
            <Link to="/faq" className="navbar-link">FAQs</Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/uploadproject" className="navbar-link">Upload Project</Link>
                <button onClick={handleLogout} className="navbar-link logout-btn">Logout</button>
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
