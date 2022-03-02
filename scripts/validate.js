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

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, ...rest})=> {
  const forms = document.querySelectorAll(formSelector);
  forms.forEach(form => {
    const inputs = form.querySelectorAll(inputSelector);
    const button = form.querySelector(submitButtonSelector);
    //checkButtonValidity(rest, form, button);
    //(fix: Убрать установку двуч слушателей на кнопку открытия editProfile);
    addListenerToOpenPopupButton(rest, form, button);
    //inputs.forEach(input => {
      //input.addEventListener('input', ()=> {
        //checkInputValidity(rest, form, input);
        //checkButtonValidity(rest, form, button);
      //});
    //})
  });
};

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
    enableValidation(this);
  }

}

const formValidator = new FormValidator({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__input-error_active'
});

formValidator.enableValidation();
