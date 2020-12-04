import React from 'react';

function PopupImage(props){
    return(
        <section className={`popup popup-image ${props.card && 'popup_opened'}`}>
          <div className="popup__window">
            <img className="popup__img" src={`${props.card.link}`} alt={`${props.card.name}`} />
            <p className="popup__caption">{props.card.name}</p>
            <button className="popup__close popup__close_image" type="button" onClick={props.onClose} />
          </div>
        </section>
    )
}

export default PopupImage