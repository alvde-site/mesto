export default class Popup {
  constructor(popupSelector){
    this._popupElement = document.querySelector(popupSelector);
    this._handleEsc = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    this._addEscCloseListnener();
  }
  close() {
    this._popupElement.classList.remove('popup_opened');
    this._removeEscCloseListener();
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape'){
      this.close();
    }
  }

  _addEscCloseListnener(){
    document.addEventListener('keydown', this._handleEsc);
  }
  _removeEscCloseListener(){
    document.removeEventListener('keydown', this._handleEsc);
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      // Закрытие по нажатию на overlay
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      // Закрытие по нажатию на крестик
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}
