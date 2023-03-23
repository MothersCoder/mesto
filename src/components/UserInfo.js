export default class UserInfo {
  constructor(userSelector, aboutSelector) {
    this._userSelector = userSelector;
    this._aboutSelector = aboutSelector;

    this._userNameData = document.querySelector(this._userSelector);
    this._userAboutData = document.querySelector(this._aboutSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameData.textContent,
      about: this._userAboutData.textContent
    }
  }

  setUserInfo(userInputValue, aboutInputValue) {
    this._userNameData.textContent = userInputValue;
    this._userAboutData.textContent = aboutInputValue;

    return
  }
}
