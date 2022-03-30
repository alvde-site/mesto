export default class UserInfo {
  constructor(nameSelector, jobSelector){
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo[this._nameElement.getAttribute('class')] = this._nameElement.textContent;
    this._userInfo[this._jobElement.getAttribute('class')] = this._jobElement.textContent;
    return this._userInfo;
  }

  setUserInfo({profilename, profilejob}) {
    this._nameElement.textContent = profilename;
    this._jobElement.textContent = profilejob;
  }

  setUserAvatar(avatarSelector, profileavatar){
    this._avatarElement = document.querySelector(avatarSelector);
    this._avatarElement.style = `background-image: url(${profileavatar})`;
  }
}
