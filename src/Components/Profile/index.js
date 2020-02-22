import React, { Component } from 'react';
import Image from '../Common/Image/Image';
import Title from '../Common/Title/Title';
import ProfileColumn from './ProfileColumn/ProfileColumn';
import ProfileData from '../../Data/Profile.json';
import './Profile.css';

//Displays the profile structure and calls the apropriate sub components
class Profile extends Component {
  
  constructor(props) {
    super(props);
    //Extract the Data from the data Profile JSON
    this.state = ProfileData;
  }

  render() {
    const title = this.state.title
    const quote = this.state.quote
    const author = this.state.author
    const firstColumn = this.state.firstColumn
    const secondColumn = this.state.secondColumn
    const src = this.state.src
    const altSrc = this.state.altSrc
    
    return (
      <section className="Profile Container">
        <Title title={title} quote={quote} author={author} />
        <div className="row">
          <ProfileColumn content={firstColumn}/>
          <Image className="col-4 text-center" src={src} alt={altSrc}/>
          <ProfileColumn content={secondColumn}/>
        </div>
      </section>
    )
  }
}

export default Profile;
