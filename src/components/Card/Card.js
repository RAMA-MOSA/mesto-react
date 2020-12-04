import React from 'react';

function Card(props){
    
    function handleCardClick(){
      props.onCardClick(props.card)
    }

    return(   
      <li className="element">
        <img className="element__photo" onClick={handleCardClick} src={props.card.link} alt={props.card.name} />
        <button className="element__trash" type="button" />
        <div className="element__box">
          <p className="element__caption">{props.card.name}</p>
          <div className="element__like-box">
            <button className="element__like" type="button" />
            <p className="element__count">{props.card.likes.length}</p>
          </div>
        </div>
      </li>
    )
}

export default Card