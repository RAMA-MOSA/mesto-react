import React from 'react';
import {useState} from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import PopupImage from '../PopupImage/PopupImage';

function App() {
  const[isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const[isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const[isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const[selectedCard, setSelectedCard] = useState('');



  function handleEditProfilePopupOpen(){
    setEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlacePopupOpen(){
    setAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function handleEditAvatarPopupOpen(){
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card){
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard('')
  }

  return (
    <div className='page'>
      <Header />
      <Main
        onEditAvatar = {handleEditAvatarPopupOpen}
        onEditProfile = {handleEditProfilePopupOpen}
        onAddPlace = {handleAddPlacePopupOpen}
        onCardClick = {handleCardClick} 
      />
      <Footer />
      <PopupWithForm 
        name='profile'
        title='Редактировать профиль'
        children={
          <>
            <input className="popup__item popup__item_name" id='name-input' name="name" type="text" placeholder="Имя" required minLength="2" maxLength="40" />
            <span id='name-input-error' className='popup__item-error' />
            <input className="popup__item popup__item_description" id='description-input' name="about" type="text" placeholder="О себе" required minLength="2" maxLength="200" />
            <span id='description-input-error' className='popup__item-error' />
          </>
        }
        buttonText='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />
      <PopupWithForm 
        name='newcard'
        title='Новое место'
        children={
          <>
            <input className="popup__item popup__item_name-element" id='name-element-input' name="name" type="text" placeholder="Название" required minLength="2" maxLength="30" />
            <span id='name-element-input-error' className='popup__item-error' />
            <input className="popup__item popup__item_link-element" id='link-element-input' name="link" type="url" placeholder="Ссылка на картинку" required />
            <span id='link-element-input-error' className='popup__item-error' />      
          </>
        }
        buttonText='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />
      <PopupWithForm 
        name='delete'
        title='Вы уверены?'
        children={
          <>
          </>
        }
        buttonText='Да'
      />
      <PopupWithForm 
        name='avatar'
        title='Обновить аватар'
        children={
          <>
            <input className="popup__item popup__item_avatar" id='avatar-input' name="avatar" type="url" placeholder="Ссылка на аватар" required />
            <span id='avatar-input-error' className='popup__item-error' role="status" />
          </>
        }
        buttonText='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />
      <PopupImage 
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
  );
};

export default App