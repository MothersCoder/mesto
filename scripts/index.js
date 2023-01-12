let page = document.querySelector('.page');

let editButton = page.querySelector('.profile__edit-button');

let popup = page.querySelector('.popup')
let formElement = page.querySelector('.popup__form');
let closedButton = page.querySelector('.popup__close');

let nameInput = page.querySelector('.popup__input_type_name');
let jobInput = page.querySelector('.popup__input_type_about');

let profileName = page.querySelector('.profile__name');
let profileDescription = page.querySelector('.profile__description');

function openModal() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  popup.classList.add('popup_shadow');
  popup.classList.add('popup_opened');
}

function closeModal() {
  popup.classList.remove('popup_opened');
  popup.classList.remove('popup_shadow');
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
