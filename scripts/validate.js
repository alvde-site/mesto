/*const setInputValid = ({inputErrorClass}, errorMessage, input) => {
  input.classList.remove(inputErrorClass);
  errorMessage.textContent = '';
}

const setInputInvalid = ({inputErrorClass}, errorMessage, input) => {
  input.classList.add(inputErrorClass);
  errorMessage.textContent = input.validationMessage;
}

const checkInputValidity = (rest, form, input) => {
  const errorMessage = form.querySelector(`#error-${input.id}`);
  if(input.validity.valid){
    setInputValid(rest, errorMessage, input);
  } else {
   setInputInvalid(rest, errorMessage, input);
  }
}

const checkButtonValidity = ({inactiveButtonClass}, form, button) => {
  if(form.checkValidity()){
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  } else {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled','');
  }
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, ...rest})=> {
  const forms = document.querySelectorAll(formSelector);
  forms.forEach(form => {
    const inputs = form.querySelectorAll(inputSelector);
    const button = form.querySelector(submitButtonSelector);
    checkButtonValidity(rest, form, button);
    addListenerToOpenPopupButton(rest, form, button);
    inputs.forEach(input => {
      input.addEventListener('input', ()=> {
        checkInputValidity(rest, form, input);
        checkButtonValidity(rest, form, button);
      });
    })
  });
};
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__input-error_active'
});
*/

//код для файла formValidator.js


class FormValidator {
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

const formValidator = new FormValidator({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__input-error_active'
}, popupAddForm.querySelector('.form'));

formValidator.enableValidation();
