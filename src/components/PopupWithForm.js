import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, callBackFunction) {
    super(popupSelector);
    this._callBackFunction = callBackFunction;
    this._popup = document.querySelector(popupSelector)
    this._submitButton = this._popup.querySelector('.popup__button')
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues = () => {
    this._inputValueList = {};
    this._inputList.forEach(item => {
      this._inputValueList[item.getAttribute('name')] = item.value;
    });

    return this._inputValueList
  };

  renderLoading(isLoading, textIsLoading, textLoaded) {
    if (isLoading) {
      this._submitButton.textContent = textIsLoading;
    } else {
      this._submitButton.textContent = textLoaded;
    }
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callBackFunction(this._getInputValues());
    });
  }

  close = () => {
    super.close();
    this._form.reset();
  }
}
