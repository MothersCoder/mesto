let page = document.querySelector('.page');

let editButton = page.querySelector('.profile__edit-button');

let formElement = page.querySelector('.popup');
let closedButton = page.querySelector('.popup__close');

let nameInput = page.querySelector('.popup__input_type_name');
let jobInput = page.querySelector('.popup__input_type_about');

let profileName = page.querySelector('.profile__name');
let profileDescription = page.querySelector('.profile__description');

function openModal() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  page.classList.add('page_shadow');
  formElement.classList.add('popup_opened');
}

function closeModal() {
  formElement.classList.remove('popup_opened');
  page.classList.remove('page_shadow');
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
