let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.form__input_profile_name');
let jobInput = document.querySelector('.form__input_profile_job');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close');


//Открытие popup
function popupOpen () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // отмена стандартной отправки формы.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClose();
}

// Закрытие popup
function popupClose () {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupOpen);
formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', popupClose);
