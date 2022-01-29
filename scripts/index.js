const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupEditForm = document.querySelector('.popup_form_edit');
const popupAddForm = document.querySelector('.popup_form_add');
const nameInput = document.querySelector('.form__input_profile_name');
const jobInput = document.querySelector('.form__input_profile_job');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//Создание карточек

const template = document.querySelector('#element_template').content;
const elements = document.querySelector('.elements__container');
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


function render () {
  initialCards.forEach(renderElement);
}

function renderElement(item) {
  const newElement = template.cloneNode(true);

  newElement.querySelector('.element__description-text').innerText = item.name;
  newElement.querySelector('.element__img').src = item.link;
  elements.append(newElement);
}

render();

//открыть popups

function popupOpenEditForm () {
  const closeButton = popupEditForm.querySelector('.popup__close');
  const formElement = popupEditForm.querySelector('.form');

  popupEditForm.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  closeButton.addEventListener('click', popupClose);
  formElement.addEventListener('submit', formSubmitHandler);
  formElement.addEventListener('submit', setProfileText)
}

function popupOpenAddElementForm () {
  const closeButton = popupAddForm.querySelector('.popup__close');
  const formElement = popupAddForm.querySelector('.form');

  popupAddForm.classList.add('popup_opened');

  closeButton.addEventListener('click', popupClose);
  formElement.addEventListener('submit', formSubmitHandler);
  formElement.addEventListener('submit', setElementContent);
}

// Закрыть popups

function popupClose (item) {
  item.target.closest('.popup').classList.remove('popup_opened');
}

//Настройка элементов введенными данными из формы

function setProfileText() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function setElementContent() {
  const newElement = template.cloneNode(true);
  const addElementName = document.querySelector('.form__input_add_name').value;
  const addElementLink = document.querySelector('.form__input_add_link').value;
  newElement.querySelector('.element__description-text').innerText =  addElementName;
  newElement.querySelector('.element__img').src = addElementLink;
  elements.prepend(newElement);
}

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // отмена стандартной отправки формы.
    popupClose(evt);
}



editButton.addEventListener('click', popupOpenEditForm);
addButton.addEventListener('click', popupOpenAddElementForm);
