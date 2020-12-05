import React from 'react';
import {useState, useEffect} from 'react';
import Card from '../Card/Card';
import edit from '../../images/edit.svg';
import add from '../../images/+.svg';
import api from '../../utils/api';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}){
    const[userName, setUserName] = useState('');	
    const[userDescription, setUserDescription] = useState('');	
    const[userAvatar, setUserAvatar] = useState('');
    const[cards, setCards] = useState([]);

    useEffect(() => {
      api.getInitialData()
        .then(([userData, cardsData]) => {
          setUserName(userData.name);
          setUserDescription(userData.about);
          setUserAvatar(userData.avatar);
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
        })
    }, [])

    return(
        <main className="content">
            <section className="profile">
              <div className="profile__avatar-box">
                <img className="profile__avatar" alt={userName} src={userAvatar} />
                <button className="profile__img-avatar" 
                onClick={onEditAvatar}/>
              </div>
              <div className="profile__info">
                <div className="profile__box">
                    <h1 className="profile__name">{userName}</h1>
                    <button className="profile__edit" type="button" 
                    onClick={onEditProfile}>
                      <img className="profile__img-edit" src={edit} alt="Изменить" />
                    </button>
                </div>
                <p className="profile__description">{userDescription}</p>
              </div>
              <button className="profile__button" type="button" 
              onClick={onAddPlace}>
                <img className="profile__img-button" src={add} alt="Добавить фото" />
              </button>
            </section>
            <section className="elements">
              <ul className="elements__box">
                {cards.map(card =>
                  <Card 
                    key={card._id}
                    card={card}
                    onCardClick={onCardClick} 
                  />
                )}  
              </ul>
            </section>
        </main>
    )
}

export default Main