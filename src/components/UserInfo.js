export default class UserInfo {
  constructor(name, job){
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo[this._name.getAttribute('class')] = this._name.textContent;
    this._userInfo[this._job.getAttribute('class')] = this._job.textContent;
    return this._userInfo;
  }

  setUserInfo({profilename, profilejob}) {
    this._name.textContent = profilename;
    this._job.textContent = profilejob;
  }
}
