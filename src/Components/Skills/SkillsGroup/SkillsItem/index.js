import React from 'react';

//Component to render each Skill item and its level
const SkillsItem = ({tag, level}) => {

  const full = <img src="/images/star.png" alt="A" />;
  const empty = <img src="/images/empty.png" alt="X" />;
  let figure = [];

  for(let i = 0; i < 6 ; i++){
    if(i<level){
      figure.push(full)
    }else{
      figure.push(empty)
    }
  }

  return (
    <li className="col-md-6">
      {tag}
      <figure>			
        {figure[0]}
        {figure[1]}
        {figure[2]}
        {figure[3]}
        {figure[4]}
      </figure>
    </li>
  )
  
}

export default SkillsItem;
