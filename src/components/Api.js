const customFetch = (url, options = {})=> {
  return fetch(url, options)
  .then((res) =>
  res.ok ? res.json() : Promise.reject(`${res.status}`)
)
  .catch((err) => {
    console.log(`${err}`);
  })
}

export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authorization = this._headers.authorization;
  }

  getInitialCards() {
    return customFetch(
      `${this._baseUrl}/cards`, {
        headers: {
          authorization: this._authorization
        }
      }
    )
  }

  getUserInfo() {
      return customFetch(
        `${this._baseUrl}/users/me`, {
          headers: {
            authorization: this._authorization
          }
        }
      )
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
        res.ok ? res.json() : Promise.reject(`${res.status}`)
      )
    .catch((err) => {
      console.log(`${err}`);
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
    res.ok ? res.json() : Promise.reject(`${res.status}`)
    )
    .catch((err) => {
      console.log(`${err}`);
    });
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    }).then((res) =>
    res.ok ? res.json() : Promise.reject(`${res.status}`)
    )
    .catch((err) => {
      console.log(`${err}`);
    });
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    }).then((res) =>
    res.ok ? res.json() : Promise.reject(`${res.status}`)
    )
    .catch((err) => {
      console.log(`${err}`);
    });
  }

  editAvatarInfo({link}) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then((res) =>
        res.ok ? res.json() : Promise.reject(`${res.status}`)
      )
    .catch((err) => {
      console.log(`${err}`);
    });
  }
}
