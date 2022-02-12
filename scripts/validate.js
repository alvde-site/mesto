const formSubmit = (event) =>{
  event.preventDefault();
}

const setInputValid = ({inputErrorClass}, errorMessage, input) => {
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
    form.addEventListener('submit', formSubmit);
    const inputs = form.querySelectorAll(inputSelector);
    const button = form.querySelector(submitButtonSelector);
    checkButtonValidity(rest, form, button);
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

