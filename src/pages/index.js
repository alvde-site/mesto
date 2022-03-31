import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
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
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '21b633d6-0242-4229-923c-a9cd21579f97',
    'Content-Type': 'application/json'
  }
});


//Загрузка данных профиля с сервера
api.setUserInfo().then((result)=>{
  const remoteFormValues = {
    profilename: result.name,
    profilejob: result.about
  }
  userInfo.setUserInfo(remoteFormValues);
  userInfo.setUserAvatar('.profile__avatar', result.avatar);
});

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
  return card.generateCard();
}

// Отрисовка элементов на странице
const cardsList = new Section({
  renderer: (cardItem) => {
    cardsList.addItem(createCard(cardItem, handleCardClick));
  }
}, '.elements__container');

//Первоначальная загрузка карточек с сервера
api.getInitialCards().then((remoteInitialCards)=>{
  cardsList.rendererItems(remoteInitialCards);
});

// Попап формы добавления карточки на страницу
const formAdd = new PopupWithForm({
  popupSelector: '.popup_handle_add-element',
  submitForm: (formValues) => {
    cardsList.addItem(createCard(formValues, handleCardClick));
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

// Попап формы редактирования профиля
const formEdit = new PopupWithForm({
  popupSelector: '.popup_handle_profile',
  submitForm: (formValues) => {
    api.editUserInfo(formValues);
    api.setUserInfo().then((result)=>{
      const remoteFormValues = {
        profilename: result.name,
        profilejob: result.about
      }
      userInfo.setUserInfo(remoteFormValues);
    });
    formEdit.close();
  }
});

formEdit.setEventListeners();

function openPopupEditForm () {
  //Деативация кнопки сабмита
  formValidator['profileform'].resetValidation();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData['profile__name'];
  jobInput.value = userData['profile__job'];
  formEdit.open();
}


// Добавить слушатели кнопкам открытия попапов редактирования профиля и добавления карточки
editButton.addEventListener('click', () => { openPopupEditForm()});
addButton.addEventListener('click', () => { openPopupAddElementForm()});
