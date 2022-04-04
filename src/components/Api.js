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
    .then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  )
    .catch((err) => {
      console.log(`Ошшибка: ${err}`);
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

  editUserInfo({profilename, profilejob}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: profilename,
        about: profilejob
      })
    })
    .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
    .catch((err) => {
      console.log(`Ошшибка: ${err}`);
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

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    )
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    )
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    )
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }
}
