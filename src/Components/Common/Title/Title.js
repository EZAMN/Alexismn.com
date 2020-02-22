import React from 'react';
import './Title.css';

//component to render titles in any application section
const Title = ({ title, quote, author}) => {

  return (
    <header className="title">
      <h2>{title}</h2>
      <p className="lead">
        “{quote}” 
        <span>- {author}</span>
      </p>
      <hr/>
    </header>
  )
  
}

export default Title;
