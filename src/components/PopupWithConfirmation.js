import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popupElement.querySelector('.form');
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm();
    });
    super.setEventListeners();
  }

  confirmDeleteCard(newSubmitForm) {
    this._submitForm = newSubmitForm;
  }
}
