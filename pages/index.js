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
import PopupWithImage from '../components/PopupWithImage.js';

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

//Обработчик закрыти просмотра изображения по esc
const handleCardClick = (name, link) => {
  const handleImagePopup = new PopupWithImage(popupImageViewing, name, link);
  handleImagePopup.open();
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
}

function openPopupAddElementForm () {
  //Деативация кнопки сабмита
  formValidator['cardform'].resetValidation();
  const handlePopup = new Popup(popupAddForm);
  handlePopup.open();
}

const addListenerToOpenPopupButton = () => {
  editButton.addEventListener('click', () => { openPopupEditForm()});
  addButton.addEventListener('click', () => { openPopupAddElementForm()});
}

addListenerToOpenPopupButton();

const addListenersToClosePopups = () => {
  popups.forEach((popup) => {
    const handlePopup = new Popup(popup);
    handlePopup.setEventListeners();
  });
};

addListenersToClosePopups();

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

popupEditForm.addEventListener('submit', submitProfileForm);
popupAddForm.addEventListener('submit', submitCardForm);

