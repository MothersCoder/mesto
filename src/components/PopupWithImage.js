import Popup from "./Popup.js";

 export default class PopupWithImage extends Popup {
   constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = this._popup.querySelector('.popup__photo');
    this._cardImagecaption = this._popup.querySelector('.popup__caption');
  }

   open(titleValue, linkValue) {
    this._cardImage.alt = titleValue;
    this._cardImage.src = linkValue;
    this._cardImagecaption.textContent = titleValue;

    super.open();
  };
}
