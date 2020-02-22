import React, { Component } from 'react';
import Title from '../Common/Title/Title.js';
import ProjectsData from '../../Data/Projects.json';
import Project from './Project';
import './Projects.css';

//component to render the projects section
class Projects extends Component {

  constructor(props) {
    super(props);
    //Extract the Data from the data skills JSON
    this.state = ProjectsData;
  }

  renderItems() {
    return this.state.projects.map(function(item){
      return <Project {...item} key={item.title} />
    })
  }

  render() {

    return (
      <section className="Projects Container">
        <Title title={this.state.title} quote={this.state.quote} author={this.state.author} />
        <ul className="row projectsList">
          { this.renderItems() }
        </ul>
      </section>
    )
  }
}

export default Projects;
