import React from 'react'
import Navbar from './Navbar';
import './Projects.css';

const Projects = () => {

  return (
    <div className='app1'>
        <Navbar />
        <h1 className='ptitle'>――――――――――&nbsp; My Top 3 Projects &nbsp;――――――――――</h1>
  
        <div className='expframep'>
          <div className='expp'>
            <h1>Math Duels</h1>
            
            <img className='image' src='/mathduels.png' alt='Math Duels' width='450'></img>
            <p className='authors'>Developers: Myself, <a href='https://github.com/fireblaze3028'>Marc Fernandes</a></p>
            <a className="repobtn" href="https://github.com/fireblaze3028/math-duels" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
          </div>
  
          <div className='expp'>
            <h1>Chef.AI</h1>
            
            <img className='image' src='/chefaigraph.png' alt='Math Duels' width='400'></img>
            <p className='authors'>Developers: Myself, <a href='https://github.com/JustaShadow2'>Arjun Atwal</a></p>
            <a className="repobtn" href="https://github.com/JustaShadow2/AI-Chef" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
          </div>

          <div className='expp'>
            <h1>YouTube To MP3</h1>
            <img className='image' src='/ytmp3LUKAS.png' alt='YouTube to MP3' width='450'></img>
            <p className='authors'>Developer: Myself</p>
            <a className="repobtn" href="https://github.com/lukasboz/YouTube-To-MP3" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
          </div>

        </div>
  
        <footer>Copyright &copy; 2025 Lukas Bozinov. All Rights Reserved.</footer>
  
      </div>
  );
}

export default Projects;