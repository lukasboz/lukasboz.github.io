// src/components/Navbar.js
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
      </ul>
      <ul className="nav-buttons">        
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