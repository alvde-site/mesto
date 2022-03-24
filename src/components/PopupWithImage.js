import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector('.image-viewing__image');
    this._popupCaption = this._popupElement.querySelector('.image-viewing__caption');
  }

  open(name, link) {
    this._popupImage.setAttribute('src', link); //Настройка src фото
    this._popupImage.setAttribute('alt', name); // Настройка alt фото
    this._popupCaption.innerText = name; // Настройка заголовка фото
    super.open();
  }
}
