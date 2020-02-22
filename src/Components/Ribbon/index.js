import React, { Component } from 'react';
import RibbonData from '../../Data/Ribbon.json';
import './Ribbon.css';

//Component to display the link ribbon element
class Ribbon extends Component {

  constructor(props) {
    super(props);
    //Extract the Data from the data ribbon JSON
    this.state = RibbonData;
  }

  render() {
    const href = "files/" + this.state.file
    const text = this.state.text
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="ribbon">{text}</a>
    )
  }
}

export default Ribbon;
