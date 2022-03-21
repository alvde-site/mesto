import Popup from './Popup.js';
import { popupImage, popupCaption } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._popupImage = popupImage;
    this._popupCaption = popupCaption;
    this._name = name;
    this._link = link;
  }

  open() {
    this._popupImage.setAttribute('src', this._link); //Настройка src фото
    this._popupImage.setAttribute('alt', this._name); // Настройка alt фото
    this._popupCaption.innerText = this._name; // Настройка заголовка фото
    super.open();
  }
}
