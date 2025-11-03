import React, { useState } from "react";
import { Menu } from "lucide-react";
import "./navbar.css"
import SignUp from "../../page/signup";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
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
            
            {/* <Link to="#hero" className="navbar-link">Home</Link> */}
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
            <a href="#faq" className="navbar-link">
              FAQs
            </a>
            <Link to="/signup" className="navbar-link">SignUp</Link>
            <Link to="/logIn" className="navbar-link">LogIn</Link>

            
          </div>

        
        </div>
      </div>
    </nav>
  );
};
