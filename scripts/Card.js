import { toggleLike } from "./index.js";
import { deletePlace } from "./index.js";
import { openFullPhoto } from "./index.js";

export default class Card {
  static _template = document.querySelector("#place__item").content;

  constructor (newCardSelectors, titleValue, linkValue) {
    this._titleValue = titleValue;
    this._linkValue = linkValue;
    this._newCardSelectors = newCardSelectors;
  }

  createCard() {
    this._cardElement = Card._template.querySelector(this._newCardSelectors.item).cloneNode(true);
    const cardImage = this._cardElement.querySelector(this._newCardSelectors.image);
    const cardTitle = this._cardElement.querySelector(this._newCardSelectors.title);

    cardImage.src = this._linkValue;
    cardImage.alt = this._titleValue;
    cardTitle.textContent = this._titleValue;

    this._cardElement.querySelector(this._newCardSelectors.like).addEventListener('click', toggleLike);
    cardImage.addEventListener('click', () => openFullPhoto(this._linkValue, this._titleValue));
    this._cardElement.querySelector(this._newCardSelectors.delete).addEventListener('click', deletePlace);

    return this._cardElement;
  };

}
