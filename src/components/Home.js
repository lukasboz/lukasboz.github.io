import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Navbar from './Navbar';
import './Home.css';

function Model() {
  const { scene } = useGLTF("/redbluetriagnlesphere.glb"); // Ensure the file path is correct.
  const modelRef = useRef();
  const [scale, setScale] = useState(1);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.rotation.x = elapsedTime * 1.5;
      modelRef.current.rotation.y = elapsedTime * 1.5;
      modelRef.current.rotation.z = elapsedTime * 1.5;
      setScale(1 + 0.15 * elapsedTime); // Scale between 0.8 and 1.2
      modelRef.current.scale.set(scale, scale, scale);
    }
  });

  return <primitive object={scene} ref={modelRef} />;
}

function SplashScreen({ onFinished }) {

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFinished();
    }, 5000); // Adjust duration as needed.
    return () => clearTimeout(timeout);
  }, [onFinished]);


  return (
    <div className="splash-screen">
      <div className="model">
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Model />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      <div className="bottomtext">
        <h1>Welcome to Lukas Bozinov's Software Portfolio!</h1>
        <h6>Loading...</h6>
      </div>

    </div>
  );
}

const Home = () => {
  const [showSplash, setShowSplash] = useState(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    return !hasVisited;
  });

  const handleSplashFinished = () => {
    sessionStorage.setItem('hasVisited', 'true');
    setShowSplash(false);
  };

  return (
    <div>
      {showSplash ? (
        <SplashScreen onFinished={handleSplashFinished} />
      ) : (
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
              <li className='desc'>✔ Go</li>
              <li className='desc'>✔ R</li>
              <li className='desc'>✔ C/C++</li>
              <li className='desc'>✔ Prolog</li>
              <li className='desc'>✔ Lisp/Scheme</li>
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
              <li className='desc'>✔ PyTorch</li>
              <li className='desc'>✔ Scikit-learn</li>
              <li className='desc'>✔ PostgreSQL</li>
              <li className='desc'>✔ Tensorflow</li>
              <li className='desc'>✔ Pandas/NumPy</li>
            </ul>
          </div>
        </div>
  
        <footer>Copyright &copy; 2025 Lukas Bozinov. All Rights Reserved.</footer>
  
      </div>
      )}
    </div>
  );
};
  export default Home;