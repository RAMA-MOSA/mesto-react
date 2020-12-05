import React from 'react';

function Card({onCardClick, card}){
    
    function handleCardClick(){
      onCardClick(card)
    }

    return(   
      <li className="element">
        <img className="element__photo" onClick={handleCardClick} src={card.link} alt={card.name} />
        <button className="element__trash" type="button" />
        <div className="element__box">
          <p className="element__caption">{card.name}</p>
          <div className="element__like-box">
            <button className="element__like" type="button" />
            <p className="element__count">{card.likes.length}</p>
          </div>
        </div>
      </li>
    )
}

export default Card