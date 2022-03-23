import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector('.image-viewing__image');
    this._popupCaption = this._popupElement.querySelector('.image-viewing__caption');
  }

  open(name, link) {
    this._name = name;
    this._link = link;
    this._popupImage.setAttribute('src', this._link); //Настройка src фото
    this._popupImage.setAttribute('alt', this._name); // Настройка alt фото
    this._popupCaption.innerText = this._name; // Настройка заголовка фото
    super.open();
  }
}
