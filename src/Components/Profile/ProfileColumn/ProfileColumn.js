import React from 'react';
import './ProfileColumn.css';

//Component to render the columns in the profile section
const ProfileColumn = ({ content }) => {

  //renders the items according to the html type set up in the data file
  let html = content.content.map(Item => {
    return <Item.type key={Item.content}>{Item.content}</Item.type>
  })

  //if a wrapper is defined, wraps the html in it
  if(typeof content.wrapper !== 'undefined')
    html = <content.wrapper>{ html }</content.wrapper>

  return (
    <section className="col-4">
      <h3>{content.title}</h3>
      { html }
    </section>
  );
  
}

export default ProfileColumn;
