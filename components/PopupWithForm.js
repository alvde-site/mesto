import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._popupSelector = popupSelector;
    this._popupForm = this._popupSelector.querySelector('.form');
    this._inputLists = this._popupSelector.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputLists.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', this._handleSubmit);
    super.setEventListeners();
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
  }

  open() {
    super.open();
    this.setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.reset();
    this._popupForm.removeEventListener('submit', this._handleSubmit);
  }
}
