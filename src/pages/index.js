import '../pages/index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

import UserInfo from '../components/UserInfo.js';

import Api from '../components/Api';

import { FormValidator } from '../components/FormValidator.js';
import { newCardSelectors, validationSettings, popupSelectors, profileSelectors} from '../utils/constants.js'

const page = document.querySelector('.page');

const profileEditButton = page.querySelector('.profile__edit-button');

const userPhotoContainer = page.querySelector('.profile__photo-container');

const popupProfile = page.querySelector('.popup_type_profile');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const aboutInput = popupProfile.querySelector('.popup__input_type_about');

const popupNewCard = page.querySelector('.popup_type_newcard');
const placeAddButton = page.querySelector(newCardSelectors.addButton);

const popupNewPhoto = page.querySelector('.popup_type_newuserphoto')

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63/',
  headers: {
    authorization: '9b78af5d-f197-432f-83cc-1da3dc82bcc9',
    'Content-Type': 'application/json'
  }
});

let userId = null;

const openProfileModal = () => {
  const data = userData.getUserInfo()
  nameInput.value = data.name;
  aboutInput.value = data.about;
  formDataProfile.open();
};

function openAddFormModal() {
  formDataPlaceCard.open();
};

function openChangeUserPhotoModal() {
  changePhotoForm.open();
}

const handleBinConfirmClick = (card) => {
  confirmForm.open();
  confirmForm.setSubmitAction(() => {
    api.deletCard(card._cardData._id).then(() => {
      card.deletePlace();
      confirmForm.close();
    })
    .catch((err) => console.log(err));
  })
}

const handleCardClick = (titleValue, linkValue) => {
  fullPhoto.open(titleValue, linkValue);
};

const handleLikeClick = (card) => {
  if(card._likes.some(item => item._id === userId)) {
    api.deletLike(card._cardData._id)
      .then((res) => {
        card.likeStatusDelete();
        card.likeCount(res.likes);
      })
      .catch((err) => console.log(`${err}`));
  } else {
    api.like(card._cardData._id)
      .then((res) => {
        card.likeStatusAdd();
        card.likeCount(res.likes);
      })
      .catch((err) => console.log(`${err}`));
  }
}

function createCard(cardData, userId) {
  const card = new Card(newCardSelectors, cardData, userId, handleCardClick, handleBinConfirmClick, handleLikeClick);
  return card.createCard();
};

const places = new Section({
  renderer: (item) => {
    const placeItem = createCard(item, userId)
    places.addItemInversion(placeItem)
  }
  }, '.place'
);

const handleProfileFormSubmit = (data) => {
  formDataProfile.renderLoading(true, 'Сохранение...', 'Сохранить');
  api
    .addUserInfo({
      name: data.firstname,
      about: data.about
  })
  .then((data) => {
    userData.setUserInfo(data);
    formDataProfile.close();
  })
  .finally(() => {
    formDataProfile.renderLoading(false, 'Сохранение...', 'Сохранить');
  })
  .catch((err) => console.log(`${err}`))
};

const addPlaceForm = (inputValues) => {
  formDataPlaceCard.renderLoading(true, 'Создание...', 'Создать');
  api
  .addNewPlace({
    name: inputValues.place,
    link: inputValues.link
  })
    .then(data => {
      const card = createCard(data, userId);
      places.addItem(card);
      formDataPlaceCard.close();
    })
    .finally(() => {
      formDataPlaceCard.renderLoading(false, 'Создание...', 'Создать');
    })
    .catch((err) => console.log(`${err}`))
};
const userData = new UserInfo(profileSelectors)

Promise.all([api.getInitialCards(), api.getUserInfo()])
.then(cardsAndUserData => {
  const cardData = cardsAndUserData[0];
  const userInfo = cardsAndUserData[1];

  userId = userInfo._id

  places.rendererItem(cardData, userId);
  userData.setUserInfo(userInfo);
})
.catch((err) => {console.log(`${err}`)})

const changePhoto = (photoLink) => {
  changePhotoForm.renderLoading(true, 'Сохранение...', 'Сохранить');
  api.loadNewUserPhoto({avatar: photoLink.link})
    .then((res) => {
      userData.setUserInfo(res);
      changePhotoForm.close()
    })
    .finally(() => {
      changePhotoForm.renderLoading(false, 'Сохранение...', 'Сохранить');
    })
    .catch((err) => console.log(`${err}`))
}

profileEditButton.addEventListener('click', openProfileModal);

placeAddButton.addEventListener('click', openAddFormModal);

userPhotoContainer.addEventListener('click', openChangeUserPhotoModal)

const profileFormValidator = new FormValidator(validationSettings, popupProfile);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationSettings, popupNewCard);
cardFormValidator.enableValidation();
const userPhotoFormValidator = new FormValidator(validationSettings, popupNewPhoto);
userPhotoFormValidator.enableValidation();

const formDataProfile = new PopupWithForm(popupSelectors.profile, handleProfileFormSubmit);
formDataProfile.setEventListeners();

const formDataPlaceCard = new PopupWithForm(popupSelectors.newPlaceCard, addPlaceForm);
formDataPlaceCard.setEventListeners();

const changePhotoForm = new PopupWithForm(popupSelectors.changeUserPhoto, changePhoto);
changePhotoForm.setEventListeners()

const confirmForm = new PopupWithConfirmation(popupSelectors.confirm, handleBinConfirmClick);
confirmForm.setEventListeners();

const fullPhoto = new PopupWithImage (popupSelectors.fullPhoto);
fullPhoto.setEventListeners();
