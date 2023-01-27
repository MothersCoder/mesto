const page = document.querySelector('.page');

const editButton = page.querySelector('.profile__edit-button');

const nameInput = page.querySelector('.popup__input_type_name');
const jobInput = page.querySelector('.popup__input_type_about');

const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');

const formElement = page.querySelector('.popup__form');
const closedButton = page.querySelector('.popup__close');

const popup = page.querySelector('.popup');
const popupAdd = page.querySelector('.popupAdd');
const popupImg = page.querySelector('.popupImg');

function openModal (modal) {
  modal.classList.add(`${modal.classList[0]}_opened`);
};

function closeModal (modal) {
  modal.classList.remove(`${modal.classList[1]}`);
}

function openProfileModal() {

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openModal (popup);
};

function closeProfileModal() {
  closeModal (popup);
};

function handleFormSubmit (evt) {
  evt.preventDefault();
  nameNew = nameInput.value;
  descriptionNew = jobInput.value;

  profileName.textContent = nameNew;
  profileDescription.textContent = descriptionNew;

  closeProfileModal();
};

editButton.addEventListener('click', openProfileModal);
closedButton.addEventListener('click', closeProfileModal);

formElement.addEventListener('submit', handleFormSubmit);

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

const placeList = document.querySelector('.place');

const addButton = page.querySelector('.profile__add-button');
const closeAddFormButton = page.querySelector('.popupAdd__close');

const closePhoto = page.querySelector('.popupImg__close');

const addFormElement = page.querySelector('.popupAdd__form');

function openAddFormModal() {
  openModal(popupAdd);
};

function closeAddFormModal() {
  closeModal(popupAdd);
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
    const imgContainer = page.querySelector('.popupImg');
    imgContainer.querySelector('.popupImg__photo').src = linkValue;
    imgContainer.querySelector('.popupImg__photo').alt = titleValue;
    imgContainer.querySelector('.popupImg__title').textContent = titleValue;
    openModal (popupImg);
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
  const title = page.querySelector('.popup__input_type_placeName');
  const link = page.querySelector('.popup__input_type_pictureLink');

  addPlace(title.value, link.value);

  title.value = "";
  link.value = "";

  closeAddFormModal();
};

function closeFullPhoto () {
  closeModal(popupImg);
}

addButton.addEventListener('click', openAddFormModal);
closeAddFormButton.addEventListener('click', closeAddFormModal);
closePhoto.addEventListener('click', closeFullPhoto);
addFormElement.addEventListener('submit', addNewPlace);

