import React from 'react';
import SkillsItem from './SkillsItem';

//Component to render skill groups and implement a skillsItem for each of its elements
const SkillsGroup = (props) => {

  const skills = props.item.skills.map(function(item){
    return <SkillsItem tag={item.tag} level={item.level} key={item.tag} />
  })

  return (
      <li>
        <h3>{props.item.title}</h3>
        <section>
          <ul className="no-bullets row">
            {skills}
          </ul>
        </section>
        <hr />
      </li>
  );

}

export default SkillsGroup;
