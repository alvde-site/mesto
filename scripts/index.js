import { initialCards } from '../utils/initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import { elements } from '../utils/constants.js';

const editButton = document.querySelector('.profile__edit-button'); // Кнопка открытия popup формы заполнения профиля
const addButton = document.querySelector('.profile__add-button'); // Кнопка открытия popup формы добавления катрочки
const popups = Array.from(document.querySelectorAll('.popup'));
const profileName = document.querySelector('.profile__name'); // Имя профиля
const profileJob = document.querySelector('.profile__job');  // Профессия профиля
const popupEditForm = document.querySelector('.popup_handle_profile');  // Popup заполнения профиля данными от пользователя
const popupAddForm = document.querySelector('.popup_handle_add-element'); // Popup создания карточки данными от пользователя
const popupAddFormElement = popupAddForm.querySelector('.form');
const addElementName = document.querySelector('.form__input_add_name');
const addElementLink = document.querySelector('.form__input_add_link');
const nameInput = document.querySelector('.form__input_profile_name');
const jobInput = document.querySelector('.form__input_profile_job');
const popupImageViewing = document.querySelector('.popup_handle_image-viewing'); // Popup просмотр изображения
const popupImage = document.querySelector('.image-viewing__image');
const popupCaption = document.querySelector('.image-viewing__caption');

const cardsList = new Section({
}
);

// Объект форм с аттрибутом name;
const formValidator = {};

const formData = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__input-error_active'
}


// Включение валидации
const enableFormValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    //Создание экземпляров класса FormValidator
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidator[formName] = validator;
    validator.enableValidation();
  });
}

enableFormValidation(formData);

const createCard = (item) => {
  const card = new Card(item, '#element_template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const renderElement = (card, position) => {
  if (position === 'start') {
    elements.append(card);
  } else {
    elements.prepend(card);
  }
}


//Закрыть popup по нажатию на esc
const addListenerByEscapeClick = () => {
  document.addEventListener('keydown', handleEscapeKey);
};

//Открыть popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  addListenerByEscapeClick();
}

//Обработчик закрыти просмотра изображения по esc
const handleCardClick = (name, link) => {
  popupImage.setAttribute('src', link); //Настройка src фото
  popupImage.setAttribute('alt', name); // Настройка alt фото
  popupCaption.innerText = name; // Настройка заголовка фото
  openPopup(popupImageViewing);
}

function openPopupEditForm () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  //Деативация кнопки сабмита
  formValidator['profileform'].resetValidation();
  openPopup(popupEditForm);
}

function openPopupAddElementForm () {
  //Деативация кнопки сабмита
  formValidator['cardform'].resetValidation();
  openPopup(popupAddForm);
}

const addListenerToOpenPopupButton = () => {
  editButton.addEventListener('click', () => { openPopupEditForm()});
  addButton.addEventListener('click', () => { openPopupAddElementForm()});
}

addListenerToOpenPopupButton();

const addListenersToClosePopups = () => {
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      // Закрытие по нажатию на overlay
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
      // Закрытие по нажатию на крестик
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup);
      }
    });
  });
};

addListenersToClosePopups();

const removeListenerByEscapeClick = () => {
  document.removeEventListener('keydown', handleEscapeKey);
}

function setProfileText() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

// Обработчик «отправки» формы
function handleSubmitForm (evt, popup) {
  evt.preventDefault(); // отмена стандартной отправки формы.
  closePopup(popup);
}

const getPopup = (evt) => {
  const popup = evt.target.closest('.popup');
  return popup;
}


function closePopup (popup) {
  popup.classList.remove('popup_opened');
  removeListenerByEscapeClick();
}

function submitProfileForm(evt) {
  const popup = getPopup(evt);
  closePopup(popup);
  handleSubmitForm(evt, popup);
  setProfileText();
}

function submitCardForm(evt) {
  const dataAddForm = {
    name: addElementName.value,
    link: addElementLink.value
  }
  const newCard = createCard(dataAddForm);
  renderElement(newCard, 'end');
  const popup = getPopup(evt);
  closePopup(popup);
  handleSubmitForm(evt, popup);
  popupAddFormElement.reset();
}

const handleEscapeKey = (evt) => {
  if(evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

initialCards.forEach((item) => {
  const newCard = createCard(item);
  renderElement(newCard, 'start');
});

popupEditForm.addEventListener('submit', submitProfileForm);
popupAddForm.addEventListener('submit', submitCardForm);

