export default class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: this._headers
    })

    .then(this._checkResponse)
  }

  addUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })

    .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: this._headers
    })

    .then(this._checkResponse)
  }

  addNewPlace(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })

    .then(this._checkResponse)
  }

  deletCard(idCard) {
    return fetch(`${this._baseUrl}cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers
    })

    .then(this._checkResponse)
  }

  like(idCard){
    return fetch(`${this._baseUrl}cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this._headers
    })

    .then(this._checkResponse)
  }
  deletLike(idCard){
    return fetch(`${this._baseUrl}cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })

    .then(this._checkResponse)
  }

  loadNewUserPhoto(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })

    .then(this._checkResponse)
  }

}
