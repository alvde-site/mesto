import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { initialCards } from '../utils/initialCards.js';
import {
  editButton,
  addButton,
  nameInput,
  jobInput,
  formData
 } from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm  from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Объект с набором форм и аттрибутом name;
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

// Попап просмотра изображения
const imagePopup = new PopupWithImage('.popup_handle_image-viewing');
const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
}

imagePopup.setEventListeners();



const createCard = (cardItem, handleCardClick)=> {
  const card = new Card(cardItem, '#element_template', handleCardClick);
  return card;
}

// Отрисовка элементов на странице
const cardsList = new Section({
  // Массив данных для добавления карточек при загрузке страницы
  items: initialCards,
  // Создание и отрисовка данных на странице
  renderer: (cardItem) => {
    const card = createCard(cardItem, handleCardClick);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
}, '.elements__container');

cardsList.rendererItems();

// Попап формы добавления карточки на страницу
const formAdd = new PopupWithForm({
  popupSelector: '.popup_handle_add-element',
  submitForm: (formValues) => {
    const card = createCard(formValues, handleCardClick);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    formAdd.close();
  }
})

formAdd.setEventListeners();

function openPopupAddElementForm () {
  //Деативация кнопки сабмита
  formValidator['cardform'].resetValidation();
  formAdd.open();
}

// Управление отображением информации профиля пользователя
const userInfo = new UserInfo('.profile__name', '.profile__job');
const userData = userInfo.getUserInfo();
nameInput.value = userData['profile__name'];
jobInput.value = userData['profile__job'];

// Попап формы редактирования профиля
const formEdit = new PopupWithForm({
  popupSelector: '.popup_handle_profile',
  submitForm: (formValues) => {
    userInfo.setUserInfo(formValues)
    formEdit.close();
  }
});

formEdit.setEventListeners();

function openPopupEditForm () {
  //Деативация кнопки сабмита
  formValidator['profileform'].resetValidation();
  formEdit.open();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData['profile__name'];
  jobInput.value = userData['profile__job'];
}


// Добавить слушатели кнопкам открытия попапов редактирования профиля и добавления карточки
editButton.addEventListener('click', () => { openPopupEditForm()});
addButton.addEventListener('click', () => { openPopupAddElementForm()});
