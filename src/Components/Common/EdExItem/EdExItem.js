import React from 'react';
import './EdExItem.css';

//component to render an Education or Experience item, based on the props passed
const EdExItem = ({ item }) => {

  return (
  <li className="row edexItem">
    <div className="col-md-4">
      <h4>{item.place}</h4>
      <p className="experience-period">{item.time}</p>
    </div>
    <div className="col-md-8">
      <h5>{item.title}</h5>
      <p className="hidden-phone">{item.description}</p>
      <section>
        <a href={item.loc.url} target="_blank" rel="noopener noreferrer">
          <img src="/images/location.png" alt="location" />
          {item.loc.tag}
        </a>
        <a href={item.link.url} target="_blank" rel="noopener noreferrer">
          <img src="/images/link.png" alt="link" />
          {item.link.tag}
        </a>
      </section>
    </div>
  </li>
  );
  
}

export default EdExItem;
