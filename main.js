(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e.name,this._link=e.link,this._template=n,this._handleCardClick=r}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._template).content.cloneNode(!0)}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._cardImage=this._element.querySelector(".element__img"),this._cardText=this._element.querySelector(".element__description-text"),this._likeButton=this._element.querySelector(".element__like-button"),this._removeButton=this._element.querySelector(".element__remove-button"),this._setEventListenter(),this._cardText.innerText=this._name,this._cardImage.src=this._link,this._cardImage.alt=this._name,this._element}},{key:"_setEventListenter",value:function(){this._addLikeToButton(),this._removeElement(),this._imageViewing()}},{key:"_addLikeToButton",value:function(){this._likeButton.addEventListener("click",(function(e){e.target.classList.toggle("element__like-button_active")}))}},{key:"_removeElement",value:function(){this._removeButton.addEventListener("click",(function(e){e.target.closest(".element").remove()}))}},{key:"_imageViewing",value:function(){var e=this;this._cardImage.addEventListener("click",(function(){e._handleCardClick(e._name,e._link)}))}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){var r,o,i=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),o=function(e,t){t.classList.add(i._inputErrorClass),e.textContent=t.validationMessage},(r="_setInputInvalid")in this?Object.defineProperty(this,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):this[r]=o,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._form=n,this._inputList=this._form.querySelectorAll(this._inputSelector),this._submitButton=this._form.querySelector(this._submitButtonSelector)}var t,r;return t=e,(r=[{key:"enableValidation",value:function(){var e=this;this._checkButtonValidity(),this._inputList.forEach((function(t){t.addEventListener("input",(function(t){e._checkInputValidity(t.target),e._checkButtonValidity()}))}))}},{key:"resetValidation",value:function(){var e=this;this._checkButtonValidity(),this._inputList.forEach((function(t){var n=e._form.querySelector("#error-".concat(t.id));e._setInputValid(n,t)}))}},{key:"_checkButtonValidity",value:function(){this._form.checkValidity()?(this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.removeAttribute("disabled")):(this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.setAttribute("disabled",""))}},{key:"_checkInputValidity",value:function(e){var t=this._form.querySelector("#error-".concat(e.id));e.validity.valid?this._setInputValid(t,e):this._setInputInvalid(t,e)}},{key:"_setInputValid",value:function(e,t){t.classList.remove(this._inputErrorClass),e.textContent=""}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"rendererItems",value:function(e){var t=this;e.reverse().forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),u=document.querySelector(".profile__edit-button"),a=document.querySelector(".profile__add-button"),c=(document.querySelector(".profile__name"),document.querySelector(".profile__job"),document.querySelector(".form__input_add_name"),document.querySelector(".form__input_add_link"),document.querySelector(".form__input_profile_name")),s=document.querySelector(".form__input_profile_job");function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var p=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupElement=document.querySelector(t),this._handleEsc=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popupElement.classList.add("popup_opened"),this._addEscCloseListnener()}},{key:"close",value:function(){this._popupElement.classList.remove("popup_opened"),this._removeEscCloseListener()}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_addEscCloseListnener",value:function(){document.addEventListener("keydown",this._handleEsc)}},{key:"_removeEscCloseListener",value:function(){document.removeEventListener("keydown",this._handleEsc)}},{key:"setEventListeners",value:function(){var e=this;this._popupElement.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&e.close(),t.target.classList.contains("popup__close")&&e.close()}))}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function _(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(){return m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=y(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},m.apply(this,arguments)}function y(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=v(e)););return e}function d(e,t){return d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},d(e,t)}function h(e,t){if(t&&("object"===f(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function v(e){return v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},v(e)}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&d(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=v(r);if(o){var n=v(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return h(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._popupImage=t._popupElement.querySelector(".image-viewing__image"),t._popupCaption=t._popupElement.querySelector(".image-viewing__caption"),t}return t=u,(n=[{key:"open",value:function(e,t){this._popupImage.setAttribute("src",t),this._popupImage.setAttribute("alt",e),this._popupCaption.innerText=e,m(v(u.prototype),"open",this).call(this)}}])&&_(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(p);function g(e){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},g(e)}function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function E(){return E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=w(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},E.apply(this,arguments)}function w(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=O(e)););return e}function S(e,t){return S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},S(e,t)}function j(e,t){if(t&&("object"===g(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}var C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&S(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=O(r);if(o){var n=O(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return j(this,e)});function u(e){var t,n=e.popupSelector,r=e.submitForm;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,n))._submitForm=r,t._popupForm=t._popupElement.querySelector(".form"),t._inputLists=t._popupElement.querySelectorAll(".form__input"),t}return t=u,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputLists.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){var e=this;this._popupForm.addEventListener("submit",(function(t){t.preventDefault(),e._submitForm(e._getInputValues())})),E(O(u.prototype),"setEventListeners",this).call(this)}},{key:"open",value:function(){E(O(u.prototype),"open",this).call(this)}},{key:"close",value:function(){E(O(u.prototype),"close",this).call(this),this._popupForm.reset()}}])&&k(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(p);function L(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var I,P=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElement=document.querySelector(t),this._jobElement=document.querySelector(n)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return this._userInfo={},this._userInfo[this._nameElement.getAttribute("class")]=this._nameElement.textContent,this._userInfo[this._jobElement.getAttribute("class")]=this._jobElement.textContent,this._userInfo}},{key:"setUserInfo",value:function(e){var t=e.profilename,n=e.profilejob;this._nameElement.textContent=t,this._jobElement.textContent=n}}])&&L(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),B={};I={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__submit",inactiveButtonClass:"form__submit_disabled",inputErrorClass:"form__input_type_error",errorClass:"popup__input-error_active"},Array.from(document.querySelectorAll(I.formSelector)).forEach((function(e){var t=new r(I,e),n=e.getAttribute("name");B[n]=t,t.enableValidation()}));var q=new b(".popup_handle_image-viewing"),V=function(e,t){q.open(e,t)};q.setEventListeners();var x=function(e,n){return new t(e,"#element_template",n).generateCard()},T=new i({renderer:function(e){T.addItem(x(e,V))}},".elements__container");T.rendererItems([{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}]);var R=new C({popupSelector:".popup_handle_add-element",submitForm:function(e){T.addItem(x(e,V)),R.close()}});R.setEventListeners();var A=new P(".profile__name",".profile__job"),F=new C({popupSelector:".popup_handle_profile",submitForm:function(e){A.setUserInfo(e),F.close()}});F.setEventListeners(),u.addEventListener("click",(function(){!function(){B.profileform.resetValidation();var e=A.getUserInfo();c.value=e.profile__name,s.value=e.profile__job,F.open()}()})),a.addEventListener("click",(function(){B.cardform.resetValidation(),R.open()}))})();