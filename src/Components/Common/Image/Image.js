import React from 'react';

//Component to render any images inside a figure tag for semantic html purposes
const Image = ({ src, altSrc, className }) =>{ 
  
  return (
    <figure className={className}>
      <img src={src} alt={altSrc} />
    </figure>
  )
  
}

export default Image;
