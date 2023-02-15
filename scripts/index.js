const page = document.querySelector('.page');

const placeList = page.querySelector('.place');

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
const cardForm = document.forms.placeCard;
const title = cardForm.querySelector('.popup__input_type_placename');
const link = cardForm.querySelector('.popup__input_type_picturelink');

const popupFullPhoto = page.querySelector('.popup_type_fullphoto');
const photo = popupFullPhoto.querySelector('.popup__photo');
const photoCaption = popupFullPhoto.querySelector('.popup__caption');

const closeButtons = document.querySelectorAll('.popup__close');

const cardTemplate = document.querySelector('#place__item').content;

const overlays = Array.from(page.querySelectorAll('.popup'));

function openModal (popup) {
  popup.classList.add('popup_opened');
};

function closeModal (popup) {
  popup.classList.remove('popup_opened');
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
  cardForm.reset();
  closeModal(popupNewCard);
};

function likePlace (evt) {
  evt.target.classList.toggle('place__like_active');
};

function deletePlace (evt) {
  evt.target.parentElement.remove();
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

  cardElement.querySelector('.place__like').addEventListener('click', likePlace);
  cardElement.querySelector('.place__image').addEventListener('click', () => openFullPhoto(linkValue, titleValue));
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

  evt.target.reset();

  closeAddFormModal();
};

function closeFullPhoto () {
  closeModal(popupFullPhoto);
};

overlays.forEach((overlay) => {
  overlay.addEventListener('click', (evt) => {
    if (evt.target === overlay) {
      closeModal(overlay);
    };
  });
});

page.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closeModal(popup);
  };
});

profileEditButton.addEventListener('click', openProfileModal);
profileForm.addEventListener('submit', handleProfileFormSubmit);

placeAddButton.addEventListener('click', openAddFormModal);
cardForm.addEventListener('submit', addPlaceForm);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');

  button.addEventListener('click', () => closeModal (popup));
});



