import React, { Component } from 'react';
import Title from '../Common/Title/Title.js';
import SkillsData from '../../Data/Skills.json';
import SkillsGroup from './SkillsGroup';
import './Skills.css';

//Component to extract all the skills data and implement a skillsgroup item for each group
class Skills extends Component {

  constructor(props) {
    super(props);
    //Extract the Data from the data skills JSON
    this.state = SkillsData;
  }

  renderItems(){
    return this.state.data.map(function(item){
      return <SkillsGroup item={item} key={item.title} />
    })
  }

  render() {

    return (
        <section className="Skills Container">
        <Title title={this.state.title} quote={this.state.quote} author={this.state.author} />
        <ul className="skillgroup">
          { this.renderItems() }
        </ul>
      </section>
    )
  }
}

export default Skills;
