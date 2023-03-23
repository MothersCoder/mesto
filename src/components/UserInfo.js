export default class UserInfo {
  constructor(userSelector, aboutSelector) {
    this._userSelector = userSelector;
    this._aboutSelector = aboutSelector;
    this._userInput = document.querySelector('.popup__input_type_name');
    this._aboutInput = document.querySelector('.popup__input_type_about');
  }

  getUserInfo() {
    this._userInput.value = document.querySelector(this._userSelector).textContent;
    this._aboutInput.value = document.querySelector(this._aboutSelector).textContent;

    return
  }

  setUserInfo() {
    const nameNew = this._userInput.value;
    const aboutNew = this._aboutInput.value;

    document.querySelector(this._userSelector).textContent = nameNew;
    document.querySelector(this._aboutSelector).textContent = aboutNew;

    return
  }
}
