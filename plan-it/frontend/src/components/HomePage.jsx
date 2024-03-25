// homepage.jsx
import React from 'react';
import Navbar from './NavBar';
import Features from './Features'
import Reviews from './Review';
import { TypeAnimation } from 'react-type-animation';
import './home.css'
import plane from "./airp.png"

function HomePage() {
    return (
      <div>
        <Navbar />
        <div style={{ padding: '20px', textAlign: 'left', marginLeft: '20px' }}>
          <h1 className='type-animation-container'>
            <span>
              Planit
            </span>
            <TypeAnimation
              sequence={[' Innovates', 2000, ' Eases your trip planning', 2000, ' Makes trips more enjoyable', 2000, "is easy to use", 2000]}
              speed={50}
              className="text-cyan-600 font-bold"
              wrapper='span'
              repeat={Infinity}>
            </TypeAnimation>
          </h1>
          <div className="container">
            <p className="type-animation-para">
              PlanIt is an innovative platform designed to revolutionize trip planning, making it easier, more enjoyable, and highly collaborative. Spearheaded by Sharat, Aditya, Jay, Ryan, Waleed, and Ishaan, our team envisioned PlanIt as a comprehensive solution to the often daunting task of organizing group trips. Our goal is to simplify the process, allowing users to effortlessly create, share, and finalize trip plans with friends and family. By integrating interactive features such as group collaboration, voting systems, and detailed trip itineraries, PlanIt aims to streamline the entire planning experience. With PlanIt, we aspire to empower users to create unforgettable memories and explore the world with ease.
            </p>
            <img src={plane} className="plane rotate" alt='' />
          </div>
        </div>
        <Features />
        <Reviews />
      </div>
    );
  }
  
  export default HomePage;