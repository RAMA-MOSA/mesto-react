import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';
import api from '../../utils/api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const[isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const[isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const[isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const[isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const[selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const[currentUser, setCurrentUser] = React.useState({});
  const[cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialData()
      .then(
        (data) => {
          const [userData, cardsData] = data;
          setCards(cardsData);
          setCurrentUser(userData);
        },
        (err) => {
          console.log(err);
        }
      )
  }, [])

  function handleAddPlaceSubmit(data){
    api.postCard(data)
      .then(
        (newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        },
        (err) => {
          console.log(err);
        }
      )
  }

  function handleUpdateAvatar(data){
    api.setUserAvatar(data)
      .then(
        (data) => {
          setCurrentUser(data);
          closeAllPopups();
        },
        (err) => {
          console.log(err);
        }
      )
  }

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
    setImagePopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({name: '', link: ''})
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then(
        (data) => {
          setCurrentUser(data);
          closeAllPopups();
        },
        (err) => {
          console.log(err);
        }
      )
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(
        () => {
          const newCards = cards.filter((elem) => elem !== card);
          setCards(newCards);
          //closeAllPopups();
        },
        (err) => {
          console.log(err);
        }
      )
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then(
        (newCard) => {
          const newCards = cards.map((currentCard) => currentCard._id === card._id ? newCard : currentCard)
          setCards(newCards);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  return (
    <CurrentUserContext.Provider value = {currentUser}>
    <div className='page'>
      <Header />
      <Main
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        onEditAvatar={handleEditAvatarPopupOpen}
        onEditProfile={handleEditProfilePopupOpen}
        onAddPlace={handleAddPlacePopupOpen}
        onCardClick={handleCardClick} 
      />
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <PopupWithForm 
        name='delete'
        title='Вы уверены?'
        buttonText='Да'
      />
      
      <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
      />
    </div>
    </CurrentUserContext.Provider>
  );
};

export default App