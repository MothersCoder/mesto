import '../pages/index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import { FormValidator } from '../components/FormValidator.js';
import { newCardSelectors, validationSettings, popupSelectors } from '../components/selectors.js'

const page = document.querySelector('.page');

const placeList = page.querySelector('.place');

const profileEditButton = page.querySelector('.profile__edit-button');

const popupProfile = page.querySelector('.popup_type_profile');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupNewCard = page.querySelector('.popup_type_newcard');
const placeAddButton = page.querySelector(newCardSelectors.addButton);
const cardForm = document.forms.placeCard;
const title = cardForm.querySelector(newCardSelectors.titleInput);
const link = cardForm.querySelector(newCardSelectors.linkInput);

const userData = new UserInfo('.profile__name', '.profile__description')

function openProfileModal() {
  userData.getUserInfo();
  popupUserProfile.open()
};

function openAddFormModal() {
  popupNewPlaceCard.open();
};

const handleCardClick = (titleValue, linkValue) => {
  const fullPhoto = new PopupWithImage (popupSelectors.fullPhoto);
  fullPhoto.open(titleValue, linkValue);
  fullPhoto.setEventListeners();
}

function createCard(titleValue, linkValue) {
  const card = new Card(newCardSelectors, titleValue, linkValue, handleCardClick)
  return card.createCard();
};

function addPlace(titleValue, linkValue) {
  const placeElement = createCard(titleValue, linkValue);
  placeList.prepend(placeElement);
};

const places = new Section({
  items: initialCards,
  renderer: (item) => {
    const place = new Card(newCardSelectors, item.name, item.link, handleCardClick)
    const placeItem = place.createCard();
    places.addItem(placeItem)
  }
  }, '.place'
);
places.rendererItem();

const handleProfileFormSubmit = () => {
  userData.setUserInfo();
  formDataProfile.close();
};

const addPlaceForm = () => {
  addPlace(title.value, link.value);
  formDataPlaceCard.close();
};

profileEditButton.addEventListener('click', openProfileModal);

placeAddButton.addEventListener('click', openAddFormModal);

const popupUserProfile = new Popup(popupSelectors.profile);
popupUserProfile.setEventListeners();
const popupNewPlaceCard = new Popup(popupSelectors.newPlaceCard);
popupNewPlaceCard.setEventListeners();

const profileFormValidator = new FormValidator(validationSettings, popupProfile);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationSettings, popupNewCard);
cardFormValidator.enableValidation();

const formDataProfile = new PopupWithForm(popupSelectors.profile, handleProfileFormSubmit);
formDataProfile.setEventListeners();
const formDataPlaceCard = new PopupWithForm(popupSelectors.newPlaceCard, addPlaceForm);
formDataPlaceCard.setEventListeners();
