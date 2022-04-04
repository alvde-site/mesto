import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popupElement.querySelector('.form');
    this._inputLists = this._popupElement.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputLists.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
  }

  confirmDeleteCard(newSubmitForm) {
    this._submitForm = newSubmitForm;
  }
}
