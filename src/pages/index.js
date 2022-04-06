import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {
  editButton,
  addButton,
  editAvatarButton,
  nameInput,
  jobInput,
  formData
 } from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm  from '../components/PopupWithForm.js';
import PopupWithConfirmation  from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '21b633d6-0242-4229-923c-a9cd21579f97',
    'Content-Type': 'application/json'
  }
});

// Отрисовка карточек на странице
const cardsList = new Section({
  renderer: (cardItem) => {  // cardItem = объект карточки с сервера
    cardsList.addItem(createCard(cardItem));
  }
}, '.elements__container');


// Отображение корзинки удаления карточки
let userId;

Promise.all([api.getUserInfo(),api.getInitialCards()])
  .then(([userData, cards]) => { // cards = массив объектов карточке с сервера
    userId = userData._id;
    const remoteFormValues = setUserInfo(userData);
    userInfo.setUserInfo(remoteFormValues);
    userInfo.setUserAvatar('.profile__avatar', userData.avatar);

    cardsList.rendererItems(cards); // Вызов функции renderer из класса Section
  })

const setUserInfo = (result)=> {
  const remoteFormValues = {
    profilename: result.name,
    profilejob: result.about
  }
  return remoteFormValues;
}

// Управление отображением информации профиля пользователя
const userInfo = new UserInfo('.profile__name', '.profile__job');

// Объект с набором форм и аттрибутом name;
const formValidator = {};

// Включение валидации
const enableFormValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidator[formName] = validator;
    validator.enableValidation();
  });
}

enableFormValidation(formData);

// Попап с сообщением удаления карточки
const confirmPopup = new PopupWithConfirmation({
  popupSelector: '.popup_handle_remove-confirm',
  submitForm: () => {}
});

confirmPopup.setEventListeners();

const handleRemoveCard = (cardId, event) => {
  confirmPopup.open();
  confirmPopup.confirmDeleteCard(() => {
    api.deleteCard(cardId).then(() => {
      event.target.closest('.element').remove()
      confirmPopup.close();
    });
  })
}

const handleLikeClick = (cardId, likes, button, userId, likeCounter) => {
  if(likes.find(item => item._id === userId)) {
    api.removeLike(cardId)
      .then((res) => {
        button.target.classList.remove('element__like-button_active');
        likeCounter.innerText = res.likes.length;
    })
  } else {
    api.addLike(cardId)
      .then((res) => {
        button.target.classList.add('element__like-button_active');
        likeCounter.innerText = res.likes.length;
    })
 }
}

// Попап просмотра изображения
const imagePopup = new PopupWithImage('.popup_handle_image-viewing');
const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
}
imagePopup.setEventListeners();

// Попап редактирования аватара
const avatarPopup = new PopupWithForm({
  popupSelector: '.popup_handle_edit-avatar',
  submitForm: (formValues) => {
    api.editAvatarInfo(formValues)
      .then((res) => {
        userInfo.setUserAvatar('.profile__avatar', res.avatar);
        avatarPopup.close();
       })
      .finally(()=>{
        avatarPopup.renderLoading(false);
      });
  }
});
avatarPopup.setEventListeners();

const createCard = (cardItem)=> {
  const card = new Card(cardItem, '#element_template', handleCardClick, handleRemoveCard, handleLikeClick, userId);
  return card.generateCard();
}


// Форма добавления карточки на страницу
const formAdd = new PopupWithForm({
  popupSelector: '.popup_handle_add-element',
  submitForm: (formValues) => {  //formValues =  Значение полей формы добавления карточки
    api.addCard(formValues)
      .then((res) => {
        cardsList.addItem(createCard(res));  // Вставка готового элемента на страницу
        formAdd.close();
    })
    .finally(()=>{
      formAdd.renderLoading(false);
    });
  }
})

formAdd.setEventListeners();

function openPopupAddElementForm () {
  //Деативация кнопки сабмита
  formValidator['cardform'].resetValidation();
  formAdd.open();
}

// Попап формы редактирования профиля
const formEdit = new PopupWithForm({
  popupSelector: '.popup_handle_profile',
  submitForm: (formValues) => {
    api.editUserInfo(formValues)
      .then((res) => {
        const userData = {
          profilename: res.name,
          profilejob: res.about
        }
        userInfo.setUserInfo(userData);
        formEdit.close();
      })
      .finally(()=>{
        formEdit.renderLoading(false);
      });
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

function openPopupEditAvatar () {
  //Деативация кнопки сабмита
  formValidator['avatarform'].resetValidation();
  avatarPopup.open();
}

// Добавить слушатели кнопкам открытия попапов редактирования профиля и добавления карточки
editButton.addEventListener('click', () => { openPopupEditForm()});
addButton.addEventListener('click', () => { openPopupAddElementForm()});
editAvatarButton.addEventListener('click', () => { openPopupEditAvatar()});

