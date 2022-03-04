import { initialCards } from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const editButton = document.querySelector('.profile__edit-button'); // Кнопка открытия popup формы заполнения профиля
const addButton = document.querySelector('.profile__add-button'); // Кнопка открытия popup формы добавления катрочки
const elements = document.querySelector('.elements__container'); // Место вставки готовой карточки
const popups = Array.from(document.querySelectorAll('.popup'));
const profileName = document.querySelector('.profile__name'); // Имя профиля
const profileJob = document.querySelector('.profile__job');  // Профессия профиля
const popupEditForm = document.querySelector('.popup_handle_profile');  // Popup заполнения профиля данными от пользователя
const popupAddForm = document.querySelector('.popup_handle_add-element'); // Popup создания карточки данными от пользователя
const popupAddFormElement = popupAddForm.querySelector('.form');
const popupEditFormElement = popupEditForm.querySelector('.form');
const addElementName = document.querySelector('.form__input_add_name');
const addElementLink = document.querySelector('.form__input_add_link');
const nameInput = document.querySelector('.form__input_profile_name');
const jobInput = document.querySelector('.form__input_profile_job');
const popupImageViewing = document.querySelector('.popup_handle_image-viewing'); // Popup просмотр изображения
const popupImage = document.querySelector('.image-viewing__image');
const popupCaption = document.querySelector('.image-viewing__caption');

const formData = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__input-error_active'
}

const addFormValidator = new FormValidator(formData, popupAddFormElement);
addFormValidator.enableValidation();
const editFormValidator = new FormValidator(formData, popupEditFormElement);
editFormValidator.enableValidation();

const createCard = (item) => {
  const card = new Card(item);
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

function openPopupEditForm () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  editFormValidator.resetValidation();
  openPopup(popupEditForm);
}

function openPopupAddElementForm () {
  addFormValidator.resetValidation();
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

const addListenerByEscapeClick = () => {
  document.addEventListener('keydown', handleEscapeKey);
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  addListenerByEscapeClick();
}

export function viewImage(img) {
  const imageSrc = img.target.getAttribute('src');
  const imageCaption = img.target.closest('.element').querySelector('.element__description-text').textContent;

  popupImage.setAttribute('src', imageSrc); //Настройка src фото
  popupImage.setAttribute('alt', imageCaption); // Настройка alt фото
  popupCaption.innerText = imageCaption; // Настройка заголовка фото
  openPopup(popupImageViewing);
}

initialCards.forEach((item) => {
  const newCard = createCard(item);
  renderElement(newCard, 'start');
});

popupEditForm.addEventListener('submit', submitProfileForm);
popupAddForm.addEventListener('submit', submitCardForm);

