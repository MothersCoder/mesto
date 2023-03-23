import '../pages/index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import { FormValidator } from '../components/FormValidator.js';
import { newCardSelectors, validationSettings, popupSelectors, initialCards } from '../utils/constants.js'

const page = document.querySelector('.page');

const profileEditButton = page.querySelector('.profile__edit-button');

const popupProfile = page.querySelector('.popup_type_profile');

const popupNewCard = page.querySelector('.popup_type_newcard');
const placeAddButton = page.querySelector(newCardSelectors.addButton);
const cardForm = document.forms.placeCard;
const title = cardForm.querySelector(newCardSelectors.titleInput);
const link = cardForm.querySelector(newCardSelectors.linkInput);

const userData = new UserInfo('.profile__name', '.profile__description')
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const aboutInput = popupProfile.querySelector('.popup__input_type_about');

function openProfileModal() {
  nameInput.value = userData.getUserInfo()[0];
  aboutInput.value = userData.getUserInfo()[1];

  formDataProfile.open();
};

function openAddFormModal() {
  formDataPlaceCard.open();
};

const handleCardClick = (titleValue, linkValue) => {
  fullPhoto.open(titleValue, linkValue);
};

function createCard(titleValue, linkValue) {
  const card = new Card(newCardSelectors, titleValue, linkValue, handleCardClick)
  return card.createCard();
};

function addPlace(titleValue, linkValue) {
  const placeElement = createCard(titleValue, linkValue);
  places.addItem(placeElement);
};

const places = new Section({
  items: initialCards,
  renderer: (item) => {
    const placeItem = createCard(item.name, item.link)
    places.addItem(placeItem)
  }
  }, '.place'
);
places.rendererItem();

const handleProfileFormSubmit = () => {
  userData.setUserInfo(nameInput.value, aboutInput.value);
  formDataProfile.close();
};

const addPlaceForm = () => {
  addPlace(title.value, link.value);
  formDataPlaceCard.close();
};

profileEditButton.addEventListener('click', openProfileModal);

placeAddButton.addEventListener('click', openAddFormModal);

const profileFormValidator = new FormValidator(validationSettings, popupProfile);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationSettings, popupNewCard);
cardFormValidator.enableValidation();

const formDataProfile = new PopupWithForm(popupSelectors.profile, handleProfileFormSubmit);
formDataProfile.setEventListeners();
const formDataPlaceCard = new PopupWithForm(popupSelectors.newPlaceCard, addPlaceForm);
formDataPlaceCard.setEventListeners();

const fullPhoto = new PopupWithImage (popupSelectors.fullPhoto);
fullPhoto.setEventListeners();
