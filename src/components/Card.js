export default class Card {
  constructor(data, cardSelector, handleCardClick, handleRemoveCard, {handleLikeClick}, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardId = data._id;
    this._template = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._template)
    .content
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__img');
    this._cardText = this._element.querySelector('.element__description-text');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._removeButton = this._element.querySelector('.element__remove-button');
    this._likeCounter = this._element.querySelector('.element__like-count');

    this._setEventListenter();

    this._cardText.innerText = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCounter.innerText = this._likes.length;
    this._setLikes();
    if(this._userId !== this._ownerId) {
      this._removeButton.style.display = 'none';
    }
    return this._element;
  }

  _setEventListenter() {
    this._addLikeToButton();
    this._removeElement();
    this._imageViewing();
  }

  _addLikeToButton() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._cardId);
    });
  }

  _removeElement() {
    this._removeButton.addEventListener('click', (event) => {
      this._handleRemoveCard(this._cardId, event);
    });
  }

  _imageViewing() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _setLikes() {
      if(this.isLiked()) {
        this._likeButton.classList.add('element__like-button_active');
      } else {
        this._likeButton.classList.remove('element__like-button_active');
      }
  }

  setNewLikes(newLikes) {
    this._likes = newLikes;
    this._likeCounter.innerText = this._likes.length;
    this._setLikes();
  }

  isLiked() {
    const isLikedCard = this._likes.find(item => item._id === this._userId);
    return isLikedCard;
  }
}
