export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authorization = this._headers.authorization;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          authorization: this._authorization
        }
      })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
        .catch((err) => {
          console.log(`Ошшибка: ${err}`);
        });
  }


  /*setUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }*/

  editUserInfo({profilename, profilejob}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: profilename,
        about: profilejob
      })
    });
  }

  addCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
  }
}
