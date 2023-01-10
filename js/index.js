let page = document.querySelector('.page');

let editButton = page.querySelector('.profile__edit-button');

let popup = page.querySelector('.popup');
let closedButton = page.querySelector('.popup__close');


function opened() {
  page.classList.add('page_shadow');
  popup.className = 'popup_opened';
}

editButton.addEventListener('click', opened);

function closed() {
  popup.className = 'popup';
  page.classList.remove('page_shadow');
}

closedButton.addEventListener('click', closed);


let formElement = page.querySelector('.popup');

let nameInput = page.querySelector('.popup__input_type_name');
let jobInput = page.querySelector('.popup__input_type_about');


function handleFormSubmit (evt) {
    evt.preventDefault();


    nameNew = nameInput.value;
    descriptionNew = jobInput.value;

    let profileName = page.querySelector('.profile__name');
    let profileDescription = page.querySelector('.profile__description');

    profileName.textContent = nameNew;
    profileDescription.textContent = descriptionNew;

    closed();
}

formElement.addEventListener('submit', handleFormSubmit);
