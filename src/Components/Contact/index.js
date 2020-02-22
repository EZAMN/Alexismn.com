import React, { Component } from 'react';
import Title from '../Common/Title/Title.js';
import ContactMethod from './ContactMethod';
import ContactData from '../../Data/Contact.json';
import './Contact.css';

//Displays the structure for the contact section and calls the required subcomponents
class Contact extends Component {

  constructor(props) {
    super(props);
    //Extract the Data from the data Contact JSON
    this.state = ContactData;
  }

  renderItems(){
    return this.state.contactMethods.map(function(item){
      return <ContactMethod item={item} key={item.class} />
    })
  }

  render() {
    const title = this.state.title
    const quote = this.state.quote
    const author = this.state.author

    return (
      <section className="Contact Container">
        <Title title={title} quote={quote} author={author} />
        <ul className="no-bullets row">
          { this.renderItems() }
        </ul>
        <hr />
      </section>
    );
  }
}

export default Contact;
