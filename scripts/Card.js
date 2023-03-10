export default class Card {

  constructor (newCardSelectors, titleValue, linkValue, openPhotoModal) {
    this._titleValue = titleValue;
    this._linkValue = linkValue;
    this._newCardSelectors = newCardSelectors;
    this._template = document.querySelector("#place__item").content;
    this._openPhotoModal = openPhotoModal;
    this._cardElement - this._cardElement;
  }

  _openFullSizePhoto = () => {
    this._openPhotoModal(this._titleValue, this._linkValue);
    }

  _toggleLike = (evt) => {
    evt.target.classList.toggle(this._newCardSelectors.likeActive);
  };

  _deletePlace = () => {
    this._cardElement.remove();
    this._cardElement = null
  };

  createCard () {
    this._cardElement = this._template.querySelector(this._newCardSelectors.item).cloneNode(true);
    const cardImage = this._cardElement.querySelector(this._newCardSelectors.image);
    const cardTitle = this._cardElement.querySelector(this._newCardSelectors.title);

    cardImage.src = this._linkValue;
    cardImage.alt = this._titleValue;
    cardTitle.textContent = this._titleValue;

    this._cardElement.querySelector(this._newCardSelectors.like).addEventListener('click', this._toggleLike);
    cardImage.addEventListener('click', this._openFullSizePhoto);
    this._cardElement.querySelector(this._newCardSelectors.delete).addEventListener('click', this._deletePlace);

    return this._cardElement;
  };
}
