import React, { useState } from "react";
import { Menu } from "lucide-react";
import "./navbar.css"

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
            <a href="#" className="navbar-link">
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
          </div>

        
        </div>
      </div>
    </nav>
  );
};
