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
const addElementName = document.querySelector('.form__input_add_name');
const addElementLink = document.querySelector('.form__input_add_link');
const nameInput = document.querySelector('.form__input_profile_name');
const jobInput = document.querySelector('.form__input_profile_job');
const popupImageViewing = document.querySelector('.popup_handle_image-viewing'); // Popup просмотр изображения
const popupImage = document.querySelector('.image-viewing__image');
const popupCaption = document.querySelector('.image-viewing__caption');

function openPopupEditForm () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  const formValidator = new FormValidator(formData, popupEditForm.querySelector('.form'));
  formValidator.enableValidation();
  openPopup(popupEditForm);
}

function openPopupAddElementForm () {
  const formValidator = new FormValidator(formData, popupAddForm.querySelector('.form'));
  formValidator.enableValidation();
  openPopup(popupAddForm);
}

const addListenerToOpenPopupButton = () => {
  editButton.addEventListener('click', () => { openPopupEditForm()});
  addButton.addEventListener('click', () => { openPopupAddElementForm()});
}

addListenerToOpenPopupButton();

const addListenersToClosePopups = () => {
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
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
  const card = new Card(dataAddForm);
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
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
  const card = new Card(item);
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
});

popupEditForm.addEventListener('submit', submitProfileForm);
popupAddForm.addEventListener('submit', submitCardForm);

const formData = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__input-error_active'
}

const forms = document.querySelectorAll('.form');
forms.forEach((item) => {
  const formValidator = new FormValidator(formData, item);
  formValidator.enableValidation();
})
