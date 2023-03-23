export default class Card {

  constructor (newCardSelectors, titleValue, linkValue, handleCardClick) {
    this._titleValue = titleValue;
    this._linkValue = linkValue;
    this._newCardSelectors = newCardSelectors;
    this._template = document.querySelector("#place__item").content;
    this._handleCardClick = handleCardClick;
    this._cardElement = this._template.querySelector(this._newCardSelectors.item).cloneNode(true);
    this._cardImage = this._cardElement.querySelector(this._newCardSelectors.image);
    this._cardTitle = this._cardElement.querySelector(this._newCardSelectors.title);
  }

  _openFullSizePhoto = () => {
    this._handleCardClick(this._titleValue, this._linkValue);
    }

  _toggleLike = (evt) => {
    evt.target.classList.toggle(this._newCardSelectors.likeActive);
  };

  _deletePlace = () => {
    this._cardElement.remove();
    this._cardElement = null
  };

  createCard () {
    this._cardImage.src = this._linkValue;
    this._cardImage.alt = this._titleValue;
    this._cardTitle.textContent = this._titleValue;

    this._setEventListeners();

    return this._cardElement;
  };

  _setEventListeners() {
    this._cardElement.querySelector(this._newCardSelectors.like).addEventListener('click', this._toggleLike);
    this._cardImage.addEventListener('click', this._openFullSizePhoto);
    this._cardElement.querySelector(this._newCardSelectors.delete).addEventListener('click', this._deletePlace);
  }
}
