import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popupElement.querySelector('.form');
  }

  open(cardId, event) {
    this._cardId = cardId;
    this._event = event; //кнопка карточки удаления
    super.open();
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._cardId, this._event);
    });
    super.setEventListeners();
  }

  confirmDeleteCard(newSubmitForm) {
    this._submitForm = newSubmitForm;
  }
}
