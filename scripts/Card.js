const page = document.querySelector('.page');

const placeList = page.querySelector('.place');

const popups = page.querySelectorAll('.popup');

const popupNewCard = page.querySelector('.popup_type_newcard');
const addNewPlaceButton = popupNewCard.querySelector('.popup__button');
const cardForm = document.forms.placeCard;
const title = cardForm.querySelector('.popup__input_type_placename');
const link = cardForm.querySelector('.popup__input_type_picturelink');

const popupFullPhoto = page.querySelector('.popup_type_fullphoto');
const photo = popupFullPhoto.querySelector('.popup__photo');
const photoCaption = popupFullPhoto.querySelector('.popup__caption');

const cardTemplate = document.querySelector('#place__item').content;

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

