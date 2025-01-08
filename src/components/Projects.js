import React from 'react'
import Navbar from './Navbar';
import './Projects.css';

const Projects = () => {
  return (
    <div className='App'>
        <Navbar />
        <h1 className='ptitle'>My Top 3 Projects</h1>
  
        <div className='expframe'>
          <div className='exp'>
            <h1>Math Duels</h1>


            <p className='authors'>Developers: Myself, Marc Fernandes</p>
          </div>
  
          <div className='exp'>
            <h1>Chef.AI</h1>
            

            <p className='authors'>Developers: Myself, Arjun Atwal</p>
          </div>

          <div className='exp'>
            <h1>YouTube To MP3</h1>
            
            <p className='authors'>Developer: Myself</p>
          </div>

        </div>
  
        <footer>Copyright &copy; 2025 Lukas Bozinov. All Rights Reserved.</footer>
  
      </div>
  );
}

export default Projects;