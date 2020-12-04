import React from 'react';

function PopupWithForm(props){
    return(
        <section className={`popup popup-${props.name} ${props.isOpen && 'popup_opened'}`}>
          <div className="popup__container">
            <h2 className="popup__title">{props.title}</h2>
            <form className="popup__form" name={props.name} noValidate>
              <fieldset className="popup__content">
                {props.children}
                <button className="popup__button popup__save-button" type="submit">{props.buttonText}</button>
              </fieldset>
            </form>
            <button className="popup__close" type="button" onClick={props.onClose} />
          </div>
        </section>
    )
}

export default PopupWithForm