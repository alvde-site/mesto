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
  nameInput,
  jobInput,
  popupImageViewing,
  formData
 } from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm  from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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
  const userInfo = new UserInfo(profileName, profileJob);
  const userData = userInfo.getUserInfo();
  nameInput.value = userData['profile__name'];
  jobInput.value = userData['profile__job'];
  //Деативация кнопки сабмита
  formValidator['profileform'].resetValidation();
  const popupWithForm = new PopupWithForm({
    popupSelector: popupEditForm,
    submitForm: (formValues) => {
      userInfo.setUserInfo(formValues)
      popupWithForm.close();
    }
  });
  popupWithForm.open();
}

function openPopupAddElementForm () {
  //Деативация кнопки сабмита
  formValidator['cardform'].resetValidation();
  const popupWithForm = new PopupWithForm({
    popupSelector: popupAddForm,
    submitForm: (formValues) => {
      const dataAddForm = [];
      dataAddForm.push(formValues);
      console.log(dataAddForm)
      const newCard = new Section({
        items: dataAddForm,
        renderer: (cardItem) => {
          const card = new Card(cardItem, '#element_template', handleCardClick);
          const cardElement = card.generateCard();
          newCard.addItem(cardElement);
        }
      }, elements);
      newCard.rendererItems();
      popupWithForm.close();
    }
  });
  popupWithForm.open();
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

