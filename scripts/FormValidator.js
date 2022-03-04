export default class FormValidator {
  constructor(data, form) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._form = form;
    this._inputList = this._form.querySelectorAll(this._inputSelector);
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._checkButtonValidity();
    this._inputList.forEach(input => {
      input.addEventListener('input', (input)=> {
        this._checkInputValidity(input.target);
        this._checkButtonValidity();
      });
    })
  }

  resetValidation() {
    this._checkButtonValidity();
    this._inputList.forEach((input) => {
      this._checkInputValidity(input);
    });
  }

  _checkButtonValidity() {
    if(this._form.checkValidity()){
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled','');
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
