import Popup from "./Popup.js";

 export default class PopupWithImage extends Popup {
   constructor(popupSelector) {
    super(popupSelector);
  }

   open(titleValue, linkValue) {
    this._popup.querySelector('.popup__photo').alt = titleValue;
    this._popup.querySelector('.popup__photo').src = linkValue;
    this._popup.querySelector('.popup__caption').textContent = titleValue;

    super.open();
  };
}
