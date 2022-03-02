import { viewImage } from './index.js';

export default class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector('#element_template')
    .content
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._addLikeToButton();
    this._removeElement();
    this._imageViewing();
    this._element.querySelector('.element__description-text').innerText = this._name;
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._name;
    return this._element;
  }

  _addLikeToButton() {
    this._element.querySelector('.element__like-button').addEventListener('click', (button) => {
      button.target.classList.toggle('element__like-button_active');
    });
  }

  _removeElement() {
    this._element.querySelector('.element__remove-button').addEventListener('click', (button) => {
      button.target.closest('.element').remove();
    });
  }

  _imageViewing() {
    this._element.querySelector('.element__img').addEventListener('click', (img) => viewImage(img));
  }
}
