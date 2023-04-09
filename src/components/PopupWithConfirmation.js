import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(poppupSelector, handleBinConfirmClick) {
    super(poppupSelector);
    this._popupForm = document.forms.deletConfirm;
    this._handleBinConfirmClick = handleBinConfirmClick;
  }

  setSubmitAction (action) {
    this._handleBinConfirmClick = action;
  }

  setEventListeners () {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleBinConfirmClick();
    })

    super.setEventListeners();
  }
}
