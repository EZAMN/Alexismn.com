import React from 'react';
import './Area.css';

//component to wrap any of the sections in an area div tag
const Area = ({ children }) => {
  
  return (
    <div className="Area">
      {children}
    </div>
  )
  
}

export default Area;
