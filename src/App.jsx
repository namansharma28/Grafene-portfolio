import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './page/signup';
import LogIn from './page/LogIn';
import UploadProject from './page/UploadProject';
import ProjectDetail from './page/ProjectDetail';
import CursorTrail from './assets/components/CursorTrail';
import './assets/global.css';
import Portfolio from "./page";
import FAQPage from "./page/FAQPage";


export default function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorEnlarged, setCursorEnlarged] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const enlargeCursor = () => setCursorEnlarged(true);
    const shrinkCursor = () => setCursorEnlarged(false);

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', enlargeCursor);
    document.addEventListener('mouseup', shrinkCursor);

    // Use a mutation observer to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          document.querySelectorAll(
            'a, button, .faq-question, .project-card, .contact-link'
          ).forEach((element) => {
            element.addEventListener('mouseenter', enlargeCursor);
            element.addEventListener('mouseleave', shrinkCursor);
          });
        }
      });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });

    const interactiveElements = document.querySelectorAll(
      'a, button, .faq-question, .project-card, .contact-link'
    );
    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', enlargeCursor);
      element.addEventListener('mouseleave', shrinkCursor);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', enlargeCursor);
      document.removeEventListener('mouseup', shrinkCursor);
      observer.disconnect();
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', enlargeCursor);
        element.removeEventListener('mouseleave', shrinkCursor);
      });
    };
  }, []);

  return (
    <Router>
      <div className="main-container">
        {/* Background elements for all pages */}
        <div className="background">
        <img src="/rings/grafene_ring_white.png" alt="Ring" className="ring ring-1" />
        <img src="/rings/ring2.png" alt="Ring" className="ring ring-2" />
        <img src="/rings/ring3.png" alt="Ring" className="ring ring-3" />
        <img src="/rings/ring3.1.png" alt="Ring" className="ring ring-4" />
        <img src="/rings/ring4.png" alt="Ring" className="ring ring-5" />
      </div>
        {/* Main cursor dot */}
        <div
          className={`cursor-dot ${cursorEnlarged ? 'cursor-enlarged' : ''}`}
          style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
        ></div>
        {/* Cursor outline */}
        <div
          className={`cursor-outline ${cursorEnlarged ? 'cursor-enlarged' : ''}`}
          style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
        ></div>
        {/* Cursor trail */}
        <CursorTrail />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/uploadproject" element={<UploadProject />}></Route>
          <Route path="/project/:projectId" element={<ProjectDetail />}></Route>
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </div>
    </Router>
  );
}