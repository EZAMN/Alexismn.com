import React, { Component } from 'react';
import NavAnchor from './NavAnchor/NavAnchor.js';
import HeaderData from '../../Data/Header.json';
import './Header.css';

//Returns the header structure with its subcomponents
class Header extends Component {

  constructor(props) {
    super(props);
    //Extract the Data from the data Header JSON
    this.state = HeaderData;
  }

  render() {
    const name = this.state.name;
    const subtitle = this.state.subtitle;

    return (
      <header dataposition="bottom right" className="header">
        <section className="container">
          <h1>{name}</h1>
          <p className="lead">{subtitle}</p>
        </section>
        <div className="overlay"></div>
        <NavAnchor />
      </header>
    )
  }
}

export default Header;
