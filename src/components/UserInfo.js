export default class UserInfo {
  constructor(profileSelectors) {
    this._selector = profileSelectors;

    this._userName = document.querySelector(this._selector.name);
    this._userAbout = document.querySelector(this._selector.about);
    this._userPhoto = document.querySelector(this._selector.avatar);
  }

  getUserInfo() {
    return {
    name: this._userName.textContent,
    about: this._userAbout.textContent,
    avatar: this._userPhoto.src
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
    this._userPhoto.src = data.avatar;
  }

}
