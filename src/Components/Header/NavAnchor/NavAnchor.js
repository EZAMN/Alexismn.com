import React from 'react';
import './NavAnchor.css';

//component to return the Anchor for the menu in the main screen
const NavAnchor = () => {
  const src = "/images/arrow.png";
  return (
    <a href="#profile" className="scroll-down" id="navAnchor">
      <img className="arrow" src={src} alt="V" />
    </a>
  )
}

export default NavAnchor;
