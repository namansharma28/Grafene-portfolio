import React, { useState } from "react";
import { Menu } from "lucide-react";
import "./navbar.css"
import SignUp from "../../page/signup";
import { Link } from "react-router-dom";

export const UniversalNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            
            <Link to="/" className="navbar-link">About</Link>
            
            <Link to="/signup" className="navbar-link">SignUp</Link>
            <Link to="/logIn" className="navbar-link">LogIn</Link>
           
            
          </div>

        
        </div>
      </div>
    </nav>
  );
};
