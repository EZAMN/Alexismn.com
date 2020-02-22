import React, {Component} from 'react';
import Area from '../../Components/Common/Area';
import Ribbon from '../../Components/Ribbon';
import Nav from '../../Components/Nav';
import Header from '../../Components/Header';
import Profile from '../../Components/Profile';
import Education from '../../Components/Education';
import Experience from '../../Components/Experience';
import Skills from '../../Components/Skills';
import Projects from '../../Components/Projects';
import Contact from '../../Components/Contact';

//Loads homepage and the required components
class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Area><Header /></Area>
        <Nav {...this.props.location} />
        <Ribbon />
        <Area><Profile /></Area>
        <Area><Education /></Area>
        <Area><Experience /></Area>
        <Area><Skills /></Area>
        <Area><Projects /></Area>
        <Area><Contact /></Area>
      </React.Fragment>
    )
  }
}

export default Home
