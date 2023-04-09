export default class Card {

  constructor (newCardSelectors, cardData, userId, handleCardClick, handleBinConfirmClick, handleLikeClick) {
    this._newCardSelectors = newCardSelectors;

    this._cardData = cardData;
    this._userId = userId;
    this._likes = this._cardData.likes;

    this._template = document.querySelector("#place__item").content;

    this._handleCardClick = handleCardClick;
    this._handleBinConfirmClick = handleBinConfirmClick;
    this._handleLikeClick = handleLikeClick;

    this._cardElement = this._template.querySelector(this._newCardSelectors.item).cloneNode(true);
    this._cardBin = this._cardElement.querySelector(this._newCardSelectors.delete);

    this._like = this._cardElement.querySelector(this._newCardSelectors.like);
    this._likeActive = this._cardElement.querySelector(this._newCardSelectors.likeActive)
  }

  _openFullSizePhoto = () => {
    this._handleCardClick(this._cardData.name, this._cardData.link);
    }

  _toggleLike = (evt) => {
    evt.target.classList.toggle(this._newCardSelectors.likeActive);
  };

  deletePlace = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _hideBin() {
    if (this._cardData.owner._id != this._userId) {
      this._cardBin.classList.add('place__delete_hide');
    }
  }

  likeCount(likes) {
    this._likes = likes;
    this._likeNum.textContent = this._likes.length;
  }

  _initialLikeCount() {
    this._likeNum.textContent = this._cardData.likes.length;
  }

  _likeValidation() {
    return this._likes.some(item => item._id === this._userId)
  }

  likeStatusAdd() {
    this._like.classList.add(this._newCardSelectors.likeActive);
  }

  likeStatusDelete() {
    this._like.classList.remove(this._newCardSelectors.likeActive);
  }

  createCard () {
    this._cardImage = this._cardElement.querySelector(this._newCardSelectors.image);
    this._cardTitle = this._cardElement.querySelector(this._newCardSelectors.title);
    this._likeNum = this._cardElement.querySelector(this._newCardSelectors.likeNum);

    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;
    this._cardTitle.textContent = this._cardData.name;

    if(this._likeValidation()) {
      this._like.classList.add(this._newCardSelectors.likeActive);
    } else {
      this._like.classList.remove(this._newCardSelectors.likeActive);
    }

    this.likeCount(this._likes);
    this._hideBin();
    this._setEventListeners();

    return this._cardElement;
  };

  _setEventListeners() {
    this._cardElement.querySelector(this._newCardSelectors.like).addEventListener('click', this._toggleLike);
    this._cardImage.addEventListener('click', this._openFullSizePhoto);
    this._cardElement.querySelector(this._newCardSelectors.delete).addEventListener('click', () => this._handleBinConfirmClick(this));
    this._like.addEventListener('click', () =>  {this._handleLikeClick(this)});
  }
}
