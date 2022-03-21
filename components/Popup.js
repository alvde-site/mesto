export default class Popup {
  constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._handleEsc = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    this._addEscCloseListnener();
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._removeEscCloseListener();
  }
  _handleEscClose(evt) {
    if(evt.key === 'Escape'){
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => {
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
  _addEscCloseListnener(){
    document.addEventListener('keydown', this._handleEsc);
  }
  _removeEscCloseListener(){
    document.removeEventListener('keydown', this._handleEsc);
  }
}
