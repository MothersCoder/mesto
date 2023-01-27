const page = document.querySelector('.page');

const placeList = page.querySelector('.place');

const editProfileButton = page.querySelector('.profile__edit-button');
const addPlaceButton = page.querySelector('.profile__add-button');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');

const popupProfile = page.querySelector('.popup__form_type_profile');
const profileFormElement = popupProfile.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_about');
const closeProfileButton = popupProfile.querySelector('.popup__close');

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
const popupNewCard = page.querySelector('.popup__form_type_newcard');
const addFormElement = popupNewCard.querySelector('.popup__form');
const closeAddFormButton = popupNewCard.querySelector('.popup__close');

const popupFullPhoto = page.querySelector('.popup__form_type_fullphoto');
const closePhotoButton = popupFullPhoto.querySelector('.popup__close');

function openModal (form) {
  form.classList.add('popup_opened');
};

function closeModal (form) {
  form.classList.remove('popup_opened');
}

function openProfileModal() {

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openModal (popupProfile);
};

function closeProfileModal() {
  closeModal (popupProfile);
};

function handleFormSubmit (evt) {
  evt.preventDefault();
  nameNew = nameInput.value;
  descriptionNew = jobInput.value;

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

function addPlace(titleValue, linkValue) {
  const placeTamplate = document.querySelector('#place__item').content;
  const placeElement = placeTamplate.querySelector('.place__item').cloneNode(true);
  placeElement.querySelector('.place__image').src = linkValue;
  placeElement.querySelector('.place__image').alt = titleValue;
  placeElement.querySelector('.place__title').textContent = titleValue;

  placeElement.querySelector('.place__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like_active');
  });

  placeElement.querySelector('.place__delete').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });

  placeElement.querySelector('.place__image').addEventListener('click', function () {
    const a = page.querySelector('.popup__form_type_fullphoto')
    a.querySelector('.popup__photo').src = linkValue;
    a.querySelector('.popup__photo').alt = titleValue;
    a.querySelector('.popup__caption').textContent = titleValue;
    openModal (popupFullPhoto);
  });

  placeList.prepend(placeElement);
};

initialCards.forEach(function (item) {
  const title = item.name;
  const link = item.link;

  addPlace(title, link);
});

function addNewPlace(evt) {
  evt.preventDefault();
  const title = addFormElement.querySelector('.popup__input_type_placename');
  const link = addFormElement.querySelector('.popup__input_type_picturelink');

  addPlace(title.value, link.value);

  title.value = "";
  link.value = "";

  closeAddFormModal();
};

function closeFullPhoto () {
  closeModal(popupFullPhoto);
};

editProfileButton.addEventListener('click', openProfileModal);
closeProfileButton.addEventListener('click', closeProfileModal);
profileFormElement.addEventListener('submit', handleFormSubmit);

addPlaceButton.addEventListener('click', openAddFormModal);
closeAddFormButton.addEventListener('click', closeAddFormModal);
addFormElement.addEventListener('submit', addNewPlace);

closePhotoButton.addEventListener('click', closeFullPhoto);

