export default class Card {
  constructor(data, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._template = '#element_template';
    this._handleCardClick = handleCardClick;
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

    this._setEventListenter();

    this._cardText.innerText = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    return this._element;
  }

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
    this._removeButton.addEventListener('click', (button) => {
      button.target.closest('.element').remove();
    });
  }

  _imageViewing() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
