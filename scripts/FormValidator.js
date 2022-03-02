export default class FormValidator {
  constructor(data, form) {
    this.formSelector = data.formSelector;
    this.inputSelector = data.inputSelector;
    this.submitButtonSelector = data.submitButtonSelector;
    this.inactiveButtonClass = data.inactiveButtonClass;
    this.inputErrorClass = data.inputErrorClass;
    this.errorClass = data.errorClass;
    this.form = form;
  }

  enableValidation() {
    const inputs = this.form.querySelectorAll(this.inputSelector);
    const button = this.form.querySelector(this.submitButtonSelector);
    this._checkButtonValidity();
    inputs.forEach(input => {
      input.addEventListener('input', (input)=> {
        this._checkInputValidity(input.target);
        this._checkButtonValidity();
      });
    })
  }

  _checkButtonValidity() {
    const button = this.form.querySelector(this.submitButtonSelector);
    if(this.form.checkValidity()){
      button.classList.remove(this.inactiveButtonClass);
      button.removeAttribute('disabled');
    } else {
      button.classList.add(this.inactiveButtonClass);
      button.setAttribute('disabled','');
    }
  }

  _checkInputValidity(input) {
    const errorMessage = this.form.querySelector(`#error-${input.id}`);
    if(input.validity.valid){
   this._setInputValid(errorMessage, input);
    } else {
   this._setInputInvalid(errorMessage, input);
    }
  }

  _setInputValid(errorMessage, input) {
    input.classList.remove(this.inputErrorClass);
    errorMessage.textContent = '';
  }

  _setInputInvalid = (errorMessage, input) => {
    input.classList.add(this.inputErrorClass);
    errorMessage.textContent = input.validationMessage;
  }
}
