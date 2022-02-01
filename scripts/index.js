const profileName = document.querySelector('.profile__name'); // Имя профиля
const profileJob = document.querySelector('.profile__job');  // Профессия профиля
const editButton = document.querySelector('.profile__edit-button'); // Кнопка открытия popup формы заполнения профиля
const popupEditForm = document.querySelector('.popup_handle_profile');  // Popup форма заполнения профиля данными от пользователя
const nameInput = document.querySelector('.form__input_profile_name');
const jobInput = document.querySelector('.form__input_profile_job');
const addButton = document.querySelector('.profile__add-button'); // Кнопка открытия popup формы добавления катрочки
const popupAddForm = document.querySelector('.popup_handle_add-element'); // Popup форма создания карточки данными от пользователя
const addElementName = document.querySelector('.form__input_add_name');
const addElementLink = document.querySelector('.form__input_add_link');
const popupImageViewing = document.querySelector('.popup_handle_image-viewing'); // Popup просмотр изображения
const popupImage = document.querySelector('.image-viewing__image');
const popupCaption = document.querySelector('.image-viewing__caption');

//Создание карточек

const template = document.querySelector('#element_template').content; // Шаблон карточки
const elements = document.querySelector('.elements__container'); // Место вставки готовой карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// Открыть popup

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Добавление слушателей карточкам

function addListenerToElement(like, remove, src) {
  like.addEventListener('click', addLikeToButton);
  remove.addEventListener('click', removeElement);
  src.addEventListener('click', viewImage);
}

function render () {
  initialCards.forEach(createCard);
}

const renderElement = (card, wrap) => {
  wrap.append(card);
}

function addCardContent(name, link, data) {
  name.innerText = data.name; // Настройка названия карточки
  link.src = data.link; // Кнопка изображения карточки
  link.alt = data.name; // Настройка alt изображения
}

function addUserCardContent(name, link) {
  name.innerText =  addElementName.value;
  link.src = addElementLink.value;
  name.alt = addElementName.value;
}

function createCard(item) {
  const newElement = template.cloneNode(true); //  Клон создаваемой карточки
  const removeButton = newElement.querySelector('.element__remove-button'); // Кнопка удаления карточки
  const imageSrc = newElement.querySelector('.element__img'); // Изображение карточки
  const likeButton = newElement.querySelector('.element__like-button'); // Кнопка like карточки
  const imageCaption = newElement.querySelector('.element__description-text'); // Название карточки

  addCardContent(imageCaption, imageSrc, item);

  addListenerToElement(likeButton, removeButton, imageSrc);

  renderElement(newElement, elements);
}

render(); // Создаем карточки при загрузке страницы

//Создаем карточки введенными данными из формы


function setElementContent() {
  const newElement = template.cloneNode(true);
  const removeButton = newElement.querySelector('.element__remove-button');
  const imageSrc = newElement.querySelector('.element__img');
  const likeButton = newElement.querySelector('.element__like-button');
  const imageCaption = newElement.querySelector('.element__description-text');
  imageCaption.innerText =  addElementName.value;
  imageSrc.src = addElementLink.value;
  imageSrc.alt = addElementName.value;

  addUserCardContent(imageCaption, imageSrc);
  addListenerToElement(likeButton, removeButton, imageSrc);
  elements.prepend(newElement);
}


// Переключение класса у like кнопки

function addLikeToButton (button) {
  button.target.classList.toggle('element__like-button_active');
}

//Удаление карточки со страницы

function removeElement(button){
  button.target.closest('.element').remove();
}

// Добавление слушателя закрытию карточки

function addListenterToCloseButton(button) {
  button.addEventListener('click', closePopup);
}

// Просмотр изображения

function viewImage(img) {
  const imageSrc = img.target.getAttribute('src');
  const imageCaption = img.target.closest('.element').querySelector('.element__description-text').textContent;
  const closeButton = popupImageViewing.querySelector('.image-viewing__close');

  popupImage.setAttribute('src', imageSrc);
  popupCaption.innerText = imageCaption;
  openPopup(popupImageViewing);
  addListenterToCloseButton(closeButton);
}

// Добавление слушателя при submit формам

function addListenerToSubmitForm(submitButton) {
  submitButton.addEventListener('submit', formSubmitHandler);
};

//Popup редактирования профиля

function setProfileText() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function openPopupEditForm () {
  const closeButton = popupEditForm.querySelector('.popup__close');
  const formElement = popupEditForm.querySelector('.form');

  openPopup(popupEditForm);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  addListenterToCloseButton(closeButton);
  addListenerToSubmitForm(formElement);
  formElement.addEventListener('submit', setProfileText)
}

function openPopupAddElementForm () {
  const closeButton = popupAddForm.querySelector('.popup__close');
  const formElement = popupAddForm.querySelector('.form');

  openPopup(popupAddForm);

  addListenterToCloseButton(closeButton);
  addListenerToSubmitForm(formElement);
  formElement.addEventListener('submit', setElementContent);
}

// Закрыть popups

function closePopup (item) {
  item.target.closest('.popup').classList.remove('popup_opened');
}

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // отмена стандартной отправки формы.
    closePopup(evt);
}

editButton.addEventListener('click', openPopupEditForm);
addButton.addEventListener('click', openPopupAddElementForm);
