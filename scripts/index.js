const profileName = document.querySelector('.profile__name'); // Имя профиля
const profileJob = document.querySelector('.profile__job');  // Профессия профиля
const editButton = document.querySelector('.profile__edit-button'); // Кнопка открытия popup формы заполнения профиля
const popupEditForm = document.querySelector('.popup_handle_profile');  // Popup заполнения профиля данными от пользователя
const popupEditCloseButton = popupEditForm.querySelector('.popup__close');
const popupEditFormElement = popupEditForm.querySelector('.form');
const nameInput = document.querySelector('.form__input_profile_name');
const jobInput = document.querySelector('.form__input_profile_job');
const popupEditFormSubmit = popupEditForm.querySelector('.form__submit_edit-form');
const addButton = document.querySelector('.profile__add-button'); // Кнопка открытия popup формы добавления катрочки
const popupAddForm = document.querySelector('.popup_handle_add-element'); // Popup создания карточки данными от пользователя
const popupAddCloseButton = popupAddForm.querySelector('.popup__close');
const popupAddFormElement = popupAddForm.querySelector('.form');
const addElementName = document.querySelector('.form__input_add_name');
const addElementLink = document.querySelector('.form__input_add_link');
const popupAddFormSubmit = popupAddForm.querySelector('.form__submit_add-form');
const popupImageViewing = document.querySelector('.popup_handle_image-viewing'); // Popup просмотр изображения
const closeButton = popupImageViewing.querySelector('.image-viewing__close');
const popupImage = document.querySelector('.image-viewing__image');
const popupCaption = document.querySelector('.image-viewing__caption');

//Создание карточек

const template = document.querySelector('#element_template').content; // Шаблон карточки
const elements = document.querySelector('.elements__container'); // Место вставки готовой карточки

// Открыть popup

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Закрыть popups

function closePopup (popup) {
  popup.target.closest('.popup').classList.remove('popup_opened');
}

//Добавление слушателей карточкам

function addListenerToElement(like, remove, src) {
  like.addEventListener('click', addLikeToButton);
  remove.addEventListener('click', removeElement);
  src.addEventListener('click', viewImage);
}

function render () {
  initialCards.forEach(item => {
    const card = createCard(item);
    renderElement(card, elements);
  });
}

// Заполнение карточек данными

function addCardContent(name, link, formData) {
  name.innerText = formData.name; // Настройка названия карточки
  link.src = formData.link; // Кнопка изображения карточки
  link.alt = formData.name; // Настройка alt изображения
}

const renderElement = (card, wrap) => {
  wrap.prepend(card);
}

// Создание новой карточки

function createCard(item) {
  const newElement = template.cloneNode(true); //  Клон создаваемой карточки
  const removeButton = newElement.querySelector('.element__remove-button'); // Кнопка удаления карточки
  const imageSrc = newElement.querySelector('.element__img'); // Изображение карточки
  const likeButton = newElement.querySelector('.element__like-button'); // Кнопка like карточки
  const imageCaption = newElement.querySelector('.element__description-text'); // Название карточки

  addCardContent(imageCaption, imageSrc, item);
  addListenerToElement(likeButton, removeButton, imageSrc);
  return newElement;
}

render(); // Создаем карточки при загрузке страницы

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

// Добавление слушателя закрытию popup

addListenterToCloseButton(closeButton);
addListenterToCloseButton(popupEditCloseButton);
addListenterToCloseButton(popupAddCloseButton);

// Просмотр изображения

function viewImage(img) {
  const imageSrc = img.target.getAttribute('src');
  const imageCaption = img.target.closest('.element').querySelector('.element__description-text').textContent;

  popupImage.setAttribute('src', imageSrc);
  popupImage.setAttribute('alt', imageCaption);
  popupCaption.innerText = imageCaption;
  openPopup(popupImageViewing);
}

//Popup редактирования профиля

function setProfileText() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function submitProfileForm(evt) {
  formSubmitHandler(evt);
  setProfileText();
}

function submitCardForm(evt) {
  const dataAddForm = {
    name: addElementName.value,
    link: addElementLink.value
  }
  const card = createCard(dataAddForm);
  renderElement(card, elements);
  formSubmitHandler(evt);
  popupAddFormElement.reset();
}

function openPopupEditForm () {
  openPopup(popupEditForm);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openPopupAddElementForm () {
  openPopup(popupAddForm);
  addListenterToCloseButton(closeButton);
}

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // отмена стандартной отправки формы.
    closePopup(evt);
}

editButton.addEventListener('click', openPopupEditForm);
addButton.addEventListener('click', openPopupAddElementForm);
popupEditForm.addEventListener('submit', submitProfileForm);
popupAddForm.addEventListener('submit', submitCardForm);
