export default class UserInfo {
  constructor(name, job){
    this._name = name;
    this._job = job;
    this._nameSelector = document.querySelector(name);
    this._jobSelector = document.querySelector(job);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo[this._nameSelector.getAttribute('class')] = this._nameSelector.textContent;
    this._userInfo[this._jobSelector.getAttribute('class')] = this._jobSelector.textContent;
    return this._userInfo;
  }

  setUserInfo({profilename, profilejob}) {
    this._nameSelector.textContent = profilename;
    this._jobSelector.textContent = profilejob;
  }
}
