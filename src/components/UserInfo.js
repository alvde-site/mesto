export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector){
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
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

  setUserAvatar(profileavatar){
    this._avatarElement.style = `background-image: url(${profileavatar})`;
  }
}
