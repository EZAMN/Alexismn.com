import React, { Component } from 'react';
import Title from './../Common/Title/Title.js';
import EdExItem from './../Common/EdExItem/EdExItem.js';
import ExperienceData from '../../Data/Experience.json';

//Displays the Experience section structure and calls the apropriate subcomponents
class Experience extends Component {

  constructor(props) {
    super(props);
    //Extract the Data from the data Experience JSON
    this.state = ExperienceData;
  }

  renderItems() {
    return this.state.data.map(function(item){
      return <EdExItem item={item} key={item.place} />
    })
  }

  render() {

    return (
      <section className="Experience Container">
        <Title title={this.state.title} quote={this.state.quote} author={this.state.author} />
        <ul className="row">{ this.renderItems() }</ul>
      </section>
    )
  }
}
export default Experience;
