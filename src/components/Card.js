export default class Card {
  constructor(data, cardSelector, handleCardClick, handleRemoveCard, userId) {  // (ownerId, userId)
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardId = data._id;
    this._template = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
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
    this._likeCount = this._element.querySelector('.element__like-count');

    this._setEventListenter();
    //this._showRemoveButton();

    this._cardText.innerText = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCount.innerText = this._likes.length;
    if(this._userId !== this._ownerId) {
      this._removeButton.style.display = 'none';
    }
    return this._element;
  }
  //_showRemoveButton() {
  //  this._removeButton.classList.remove('element__remove-button_hide');
  //}
  _setEventListenter() {
    this._addLikeToButton();
    this._removeElement();
    this._imageViewing();
  }

  _addLikeToButton() {
    this._likeButton.addEventListener('click', (button) => {
      button.target.classList.toggle('element__like-button_active');
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
}
