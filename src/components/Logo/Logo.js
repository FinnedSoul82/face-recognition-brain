import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.png';

const Logo = () => {
  return (
    <div className="logo-container ma4 mt0">
      <Tilt className="Tilt br2 shadow-2" tiltMaxAngleX={40} tiltMaxAngleY={40} tiltReverse='true'>
        <div className="pa4" style={{height:'10rem'}}>
            <img style={{paddingTop:'1px'}} src={brain} alt='logo-brain' />          
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;