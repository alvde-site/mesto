const formSubmit = (event) =>{
  event.preventDefault();
}

const setInputValid = (errorMessage, input) => {
  input.classList.remove('form__input_type_error');
  errorMessage.textContent = '';
}

const setInputInvalid = (errorMessage, input) => {
  input.classList.add('form__input_type_error');
  errorMessage.textContent = input.validationMessage;
}

const checkInputValidity = (form, input) => {
  const errorMessage = form.querySelector(`#error-${input.id}`);
  if(input.validity.valid){
    setInputValid(errorMessage, input);
  } else {
   setInputInvalid(errorMessage, input);
  }
}

const checkButtonValidity = (form, button) => {
  if(form.checkValidity()){
    button.classList.remove('form__submit_disabled');
    button.removeAttribute('disabled','');
    console.log(form.checkValidity());
  } else {
    button.classList.add('form__submit_disabled');
    button.setAttribute('disabled','');
  }
};

const enableValidation = ()=> {
  const form = document.querySelector('.form');
  form.addEventListener('submit', formSubmit);
  const inputs = form.querySelectorAll('.form__input');
  const button = form.querySelector('.form__submit_edit-form');
  checkButtonValidity(form, button);
  inputs.forEach(input => {
    input.addEventListener('input', ()=> {
      checkInputValidity(form, input);
      checkButtonValidity(form, button);
    });
  })
};
enableValidation(/*{
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__input-error_active'
}*/);

