export const elements = document.querySelector('.elements__container'); // Место вставки готовой карточки
export const editButton = document.querySelector('.profile__edit-button'); // Кнопка открытия popup формы заполнения профиля
export const addButton = document.querySelector('.profile__add-button'); // Кнопка открытия popup формы добавления катрочки
export const popups = Array.from(document.querySelectorAll('.popup'));
export const profileName = document.querySelector('.profile__name'); // Имя профиля
export const profileJob = document.querySelector('.profile__job');  // Профессия профиля
export const popupEditForm = document.querySelector('.popup_handle_profile');  // Popup заполнения профиля данными от пользователя
export const popupAddForm = document.querySelector('.popup_handle_add-element'); // Popup создания карточки данными от пользователя
export const popupAddFormElement = popupAddForm.querySelector('.form');
export const addElementName = document.querySelector('.form__input_add_name');
export const addElementLink = document.querySelector('.form__input_add_link');
export const nameInput = document.querySelector('.form__input_profile_name');
export const jobInput = document.querySelector('.form__input_profile_job');
export const popupImageViewing = document.querySelector('.popup_handle_image-viewing'); // Popup просмотр изображения
export const popupImage = document.querySelector('.image-viewing__image');
export const popupCaption = document.querySelector('.image-viewing__caption');
export const formData = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'popup__input-error_active'
}
