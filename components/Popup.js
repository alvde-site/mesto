export default class Popup {
  constructor(popupSelector){
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
  }
  _handleEscClose() {}
  setEventListeners(evt) {
    // Закрытие по нажатию на overlay
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
     // Закрытие по нажатию на крестик
    if (evt.target.classList.contains('popup__close')) {
      this.close();
    }
  }
}
