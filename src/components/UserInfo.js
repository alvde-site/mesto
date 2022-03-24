export default class UserInfo {
  constructor(name, job){
    this._nameElement = document.querySelector(name);
    this._jobElement = document.querySelector(job);
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
}
