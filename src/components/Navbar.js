// filepath: /c:/Users/lukas/Github Projects/lukasboz.github.io/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><a href="https://github.com/lukasboz/lukasboz/blob/main/LukasResumeUpdated-4.pdf">Resumé</a></li>
      </ul>
      <ul className="nav-buttons">
        <li><a href="mailto:lukasbozinov@gmail.com">
          <img src="/mail2.png" alt="Gmail" width="37.5"></img>
        </a></li>        
        <li><a href="https://github.com/lukasboz">
          <img src="/github_white.png" alt="GitHub" width="37.5"></img>
        </a></li>
        <li><a href="https://www.linkedin.com/in/lukas-bozinov-b52479244/">
          <img src="/linkedin_white.png" alt="GitHub" width="37.5"></img>
        </a></li>
      </ul>
    </nav>
  );
}

export default Navbar;