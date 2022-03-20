import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import { initialCards } from '../utils/initialCards.js';
import {
  elements,
  editButton,
  addButton,
  popups,
  profileName,
  profileJob,
  popupEditForm,
  popupAddForm,
  popupAddFormElement,
  addElementName,
  addElementLink,
  nameInput,
  jobInput,
  popupImageViewing,
  popupImage,
  popupCaption,
  formData
 } from '../utils/constants.js';

// Объект форм с аттрибутом name;
const formValidator = {};

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

//Закрыть popup по нажатию на esc
const addListenerByEscapeClick = () => {
  document.addEventListener('keydown', handleEscapeKey);
};

//Открыть popup
/*function openPopup(popup) {
  popup.classList.add('popup_opened');
  addListenerByEscapeClick();
}*/

//Обработчик закрыти просмотра изображения по esc
const handleCardClick = (name, link) => {
  popupImage.setAttribute('src', link); //Настройка src фото
  popupImage.setAttribute('alt', name); // Настройка alt фото
  popupCaption.innerText = name; // Настройка заголовка фото
  const handlePopup = new Popup(popupImageViewing);
  handlePopup.open();
  addListenerByEscapeClick();
  //openPopup(popupImageViewing);
}

const cardsList = new Section({
  // Массив данных для добавления карточек при загрузке страницы
  items: initialCards,
  // Создание и отрисовка данных на странице
  renderer: (cardItem) => {
    const card = new Card(cardItem, '#element_template', handleCardClick);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
}, elements);

cardsList.rendererItems();

function openPopupEditForm () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  //Деативация кнопки сабмита
  formValidator['profileform'].resetValidation();
  const handlePopup = new Popup(popupEditForm);
  handlePopup.open();
  addListenerByEscapeClick();
  //openPopup(popupEditForm);
}

function openPopupAddElementForm () {
  //Деативация кнопки сабмита
  formValidator['cardform'].resetValidation();
  const handlePopup = new Popup(popupAddForm);
  handlePopup.open();
  addListenerByEscapeClick();
  //openPopup(popupAddForm);
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


//Добавление карточек на страницу через форму
function submitCardForm(evt) {
  const popup = getPopup(evt);
  handleSubmitForm(evt, popup);
  const dataAddForm = [
    {
    name: addElementName.value,
    link: addElementLink.value
    }
  ]
  const newCard = new Section({
    items: dataAddForm,
    renderer: (cardItem) => {
      const card = new Card(cardItem, '#element_template', handleCardClick);
      const cardElement = card.generateCard();
      newCard.addItem(cardElement);
    }
  }, elements);
  newCard.rendererItems();
  closePopup(popup);
  popupAddFormElement.reset();
}

const handleEscapeKey = (evt) => {
  if(evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

popupEditForm.addEventListener('submit', submitProfileForm);
popupAddForm.addEventListener('submit', submitCardForm);

