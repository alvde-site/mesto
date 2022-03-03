export default class FormValidator {
  constructor(data, form) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._form = form;
  }

  enableValidation() {
    const inputs = this._form.querySelectorAll(this._inputSelector);
    const button = this._form.querySelector(this._submitButtonSelector);
    this._checkButtonValidity();
    inputs.forEach(input => {
      input.addEventListener('input', (input)=> {
        this._checkInputValidity(input.target);
        this._checkButtonValidity();
      });
    })
  }

  _checkButtonValidity() {
    const button = this._form.querySelector(this._submitButtonSelector);
    if(this._form.checkValidity()){
      button.classList.remove(this._inactiveButtonClass);
      button.removeAttribute('disabled');
    } else {
      button.classList.add(this._inactiveButtonClass);
      button.setAttribute('disabled','');
    }
  }

  _checkInputValidity(input) {
    const errorMessage = this._form.querySelector(`#error-${input.id}`);
    if(input.validity.valid){
   this._setInputValid(errorMessage, input);
    } else {
   this._setInputInvalid(errorMessage, input);
    }
  }

  _setInputValid(errorMessage, input) {
    input.classList.remove(this._inputErrorClass);
    errorMessage.textContent = '';
  }

  _setInputInvalid = (errorMessage, input) => {
    input.classList.add(this._inputErrorClass);
    errorMessage.textContent = input.validationMessage;
  }
}
