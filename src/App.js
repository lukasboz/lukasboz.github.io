import React from 'react';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='lukasinfo'>
        <div className='lukaspic'>
          <img src='/lukasailogo.jpg' alt='Lukas Bozinov' width='300'></img>
        </div>
        <div className='namediv'>
          <h3 className='hello'>Hi there, I'm</h3>
          <h1 className='name'>Lukas Bozinov</h1>
          <h3 className='fsd'>Software Engineer</h3>
        </div>
      </div>

      <div className='expframe'>
        <h1 className='experience'>Experience</h1>

      </div>

    </div>
  );
}

export default App;