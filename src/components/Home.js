import React from 'react';
import Navbar from './Navbar';
import './Home.css';

const Home = () => {
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
          <div className='exp'>
            <h1 className='tool'>Languages</h1>
            <ul className='expdesc'>
              <li className='desc'>✔ TypeScript/JavaScript</li>
              <li className='desc'>✔ HTML5/CSS3</li>
              <li className='desc'>✔ Python</li>
              <li className='desc'>✔ Java</li>
              <li className='desc'>✔ C/C++</li>
              <li className='desc'>✔ R</li>
              <li className='desc'>✔ Lisp/Scheme</li>
              <li className='desc'>✔ Prolog</li>
              <li className='desc'>✔ Go</li>
              <li className='desc'>✔ Shell Scripting</li>
            </ul>
          </div>
  
          <div className='exp'>
            <h1 className='tool'>Frameworks, Libraries & Databases</h1>
            <ul className='expdesc'>
              <li className='desc'>✔ React</li>
              <li className='desc'>✔ Node.js</li>
              <li className='desc'>✔ Express</li>
              <li className='desc'>✔ Flask</li>
              <li className='desc'>✔ MongoDB</li>
              <li className='desc'>✔ PostgreSQL</li>
              <li className='desc'>✔ Scikit-learn</li>
              <li className='desc'>✔ PyTorch</li>
              <li className='desc'>✔ Tensorflow</li>
              <li className='desc'>✔ Pandas/NumPy</li>
            </ul>
          </div>
        </div>
  
        <footer>Copyright &copy; 2025 Lukas Bozinov. All Rights Reserved.</footer>
  
      </div>
    );
  }
  export default Home;