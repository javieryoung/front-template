import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  setItem(key, value) {
    localStorage.setItem('nerd_' + key, JSON.stringify(value));
  }

  getItem(key) {
    return JSON.parse(localStorage.getItem('nerd_' + key));
  }

  removeItem(key) {
    localStorage.removeItem('nerd_' + key);
  }

}
