import React, { Component } from 'react';
import Title from './../Common/Title/Title.js';
import EdExItem from './../Common/EdExItem/EdExItem.js';
import EducationData from '../../Data/Education.json';

//Displays the Education section structure and calls the required subcomponents
class Education extends Component {

  constructor(props) {
    super(props);
    //Extract the Data from the data Education JSON
    this.state = EducationData;
  }

  renderItems(){
    return this.state.data.map(function(item){
      return <EdExItem item={item} key={item.title} />
    })
  }

  render() {

    return (
      <section className="Education Container">
        <Title title={this.state.title} quote={this.state.quote} author={this.state.author} />
        <ul className="row">{ this.renderItems() }</ul>
      </section>
    )
  }
}

export default Education;
