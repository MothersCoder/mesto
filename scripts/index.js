const page = document.querySelector('.page');

const editButton = page.querySelector('.profile__edit-button');

const popup = page.querySelector('.popup')
const formElement = page.querySelector('.popup__form');
const closedButton = page.querySelector('.popup__close');

const nameInput = page.querySelector('.popup__input_type_name');
const jobInput = page.querySelector('.popup__input_type_about');

const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');

function openModal() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  popup.classList.add('popup_opened');
}

function closeModal() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  nameNew = nameInput.value;
  descriptionNew = jobInput.value;

  profileName.textContent = nameNew;
  profileDescription.textContent = descriptionNew;

  closeModal();
}

editButton.addEventListener('click', openModal);
closedButton.addEventListener('click', closeModal);

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

const popupAdd = page.querySelector('.popupAdd');
const addButton = page.querySelector('.profile__add-button');
const closeAddFormButton = page.querySelector('.popupAdd__close');

const addFormElement = page.querySelector('.popupAdd__form');

function openAddFormModal() {
  popupAdd.classList.add('popupAdd_opened');
};

function closeAddFormModal() {
  popupAdd.classList.remove('popupAdd_opened');
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

  placeList.prepend(placeElement);
}

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

addButton.addEventListener('click', openAddFormModal);
closeAddFormButton.addEventListener('click', closeAddFormModal);
addFormElement.addEventListener('submit', addNewPlace);

