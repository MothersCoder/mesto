const page = document.querySelector('.page');

const placeList = page.querySelector('.place');

const popups = page.querySelectorAll('.popup');

const profileEditButton = page.querySelector('.profile__edit-button');
const placeAddButton = page.querySelector('.profile__add-button');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');

const popupProfile = page.querySelector('.popup_type_profile');
const profileForm = document.forms.userProfile;
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_about');

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
const addNewPlaceButton = popupNewCard.querySelector('.popup__button');
const cardForm = document.forms.placeCard;
const title = cardForm.querySelector('.popup__input_type_placename');
const link = cardForm.querySelector('.popup__input_type_picturelink');

const popupFullPhoto = page.querySelector('.popup_type_fullphoto');
const photo = popupFullPhoto.querySelector('.popup__photo');
const photoCaption = popupFullPhoto.querySelector('.popup__caption');

const cardTemplate = document.querySelector('#place__item').content;

const overlays = Array.from(page.querySelectorAll('.popup'));

function closeModalByEscape (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closeModal(popup);
  };
};

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closeModal(popup);
    }
    if(evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  });
});

function openModal (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalByEscape);
};

function closeModal (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeModalByEscape);
};

function openProfileModal() {

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openModal (popupProfile);
};

function closeProfileModal() {
  closeModal (popupProfile);
};

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  const nameNew = nameInput.value;
  const descriptionNew = jobInput.value;

  profileName.textContent = nameNew;
  profileDescription.textContent = descriptionNew;

  closeProfileModal();
};


function openAddFormModal() {
  openModal(popupNewCard);
};

function closeAddFormModal() {
  closeModal(popupNewCard);
};

function toggleLike (evt) {
  evt.target.classList.toggle('place__like_active');
};

function deletePlace (evt) {
  evt.target.closest('li').remove();
};

function openFullPhoto (linkValue, titleValue) {
    photo.src = linkValue;
    photo.alt = titleValue;
    photoCaption.textContent = titleValue;
    openModal (popupFullPhoto);
};

function createCard(titleValue, linkValue) {
  const cardElement = cardTemplate.querySelector('.place__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.place__image');
  const cardTitle = cardElement.querySelector('.place__title');

  cardImage.src = linkValue;
  cardImage.alt = titleValue;
  cardTitle.textContent = titleValue;

  cardElement.querySelector('.place__like').addEventListener('click', toggleLike);
  cardImage.addEventListener('click', () => openFullPhoto(linkValue, titleValue));
  cardElement.querySelector('.place__delete').addEventListener('click', deletePlace);

  return cardElement;
};

function addPlace(titleValue, linkValue) {
  const placeElement = createCard(titleValue, linkValue);

  placeList.prepend(placeElement);
};

initialCards.forEach(function (item) {
  const title = item.name;
  const link = item.link;

  addPlace(title, link);
});

function addPlaceForm(evt) {
  evt.preventDefault();

  addPlace(title.value, link.value);

  closeAddFormModal();
};

function closeFullPhoto () {
  closeModal(popupFullPhoto);
};

profileEditButton.addEventListener('click', openProfileModal);
profileForm.addEventListener('submit', handleProfileFormSubmit);

placeAddButton.addEventListener('click', openAddFormModal);
cardForm.addEventListener('submit', (evt) => {
  addPlaceForm(evt);
  cardForm.reset();
});

