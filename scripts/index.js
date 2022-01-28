let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let popupEditForm = document.querySelector('.popup_form_edit');
let popupAddForm = document.querySelector('.popup_form_add');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input_profile_name');
let jobInput = document.querySelector('.form__input_profile_job');
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');

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
  elements.appendChild(newElement);
}

render();

//открыть popups

function popupOpenEditForm () {
  let closeButton = popupEditForm.querySelector('.popup__close');
  popupEditForm.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  closeButton.addEventListener('click', popupClose);

}

function popupOpenAddForm () {
  let closeButton = popupAddForm.querySelector('.popup__close');
  popupAddForm.classList.add('popup_opened');

  closeButton.addEventListener('click', popupClose);
}



// Закрыть popups
function popupClose (item) {
  item.target.closest('.popup').classList.remove('popup_opened');
}
// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // отмена стандартной отправки формы.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClose();
}



editButton.addEventListener('click', popupOpenEditForm);
addButton.addEventListener('click', popupOpenAddForm);
formElement.addEventListener('submit', formSubmitHandler);

//popup для addElementForm
