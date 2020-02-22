import React, { Component } from 'react';

//component to return a contact method in the contact section, uses Right to left text render for security concerns
class Contact extends Component {

  constructor(props) {
    super(props);
    this.style = {unicodeBidi: 'bidi-override', direction: "rtl"}
  }

  reverseString(str) {
    return str.split("").reverse().join("");
  }

  render() {
    let value = this.reverseString(this.props.item.value);
    let classe = this.props.item.class + " col-md-6";
    let style = this.style;

    if(this.props.item.link !== undefined){
      value = <a href={this.props.item.link} style={style}>{value}</a>
      style = {};
    }

    return (<li className={classe} style={style}>{value}</li>)
  }
}

export default Contact;
