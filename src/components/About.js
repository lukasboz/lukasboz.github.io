// filepath: /c:/Users/lukas/Github Projects/lukasboz.github.io/src/components/About.js
import React from 'react';
import Navbar from './Navbar';
import './About.css';

const About = () => {
  return (
    <div className="aboutmeroot">
        <Navbar />
        <h1 className='aboutmetitle'>――――――――――――&nbsp; About Me &nbsp;――――――――――――</h1>

        <div className='aboutmeframe'>
          <div className='aboutmeelement'>
            <h1 id='whoiam'>Who I Am</h1>
            <p id='whoiamdesc'>I'm Lukas Bozinov, a third-year student at Western University who is concentrating on computer science with honours. 
              I have concentrated on developing my technical, mathematical, and social abilities throughout my undergraduate education, 
              working with like-minded classmates to promote novel ideas and concepts. I am a committed and growth-oriented person 
              who actively participates in extracurricular computer-related activities and welcomes obstacles as teaching opportunities. 
              My personal objective is to create products and software that have a positive effect and to contribute to the wider tech industry.</p>

            <h1 id='maininterests'>Technological Interests</h1>
            <p id='maininterestsdesc'>I am currently developing Chef.AI, an innovative project aimed at revolutionizing the culinary 
              space through artificial intelligence. This project combines my technical expertise and creativity to solve real-world problems.
              In addition to my work on Chef.AI, I am broadening my knowledge in Defensive Cybersecurity, Artificial Intelligence, and Blockchain 
              technologies. These fields captivate me because of their transformative potential and the unique challenges they present. 
              You can explore all of my projects on my GitHub, where I showcase a variety of applications and experiments spanning 
              my interests in development and emerging technologies (my 3 favourite are on this portfolio). I am always happy to discuss topics such as Machine Learning, 
              Full-Stack Development, esoteric programming languages, and Web 3.0! 🚀 Whether you're seeking insights or just curious 
              about these areas, feel free to reach out. If you'd like to get in touch, you can email me using the mail button on the website hotbar. 
              Additionally, you can learn more about my work and experience by viewing my resume. Let's connect and innovate together!</p>
            
          </div>

          <div className='hobbies'>
            <h1 id='hobby'>My Hobbies & Interests</h1>
            <p id='hobbydesc'>Outside of the technological world, I like to play music (drums, bass guitar, electric guitar)
              and also enjoy learning new languages (right now, I'm learning Simplified Chinese. 你好!) in addition to the languages I already know (English, Macedonian (Здраво!), and Swedish (Hej!)). 
              I am also a big fan of reading science fiction novels, playing video games, and exploring new places around the world. 
              These activities help me unwind and keep my creativity flowing, and push me to work harder when it's time to focus.</p>
          
              <h1 id='hobby'>Ongoing & Future Activities</h1>
              <p id='hobbydesc'><ul className='activitylist'>
                <li>QA Automation Intern @ J.D. Power (May 2025 - Sept. 2026)</li>
                <li>Math Duels (still in development!)</li>
                <li>Working on Ethical Hacking via TryHackMe and HackTheBox</li>
                <li>... and many more interesting things!</li>
                </ul></p>
          
          </div>
        </div>

      <footer>Copyright &copy; 2025 Lukas Bozinov. All Rights Reserved.</footer>

    </div>
  );
}

export default About;