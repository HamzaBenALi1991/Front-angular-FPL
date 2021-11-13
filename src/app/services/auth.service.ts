import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  logIn(token: any, Id: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('_Id', Id);
  }
  logout() {
    localStorage.clear()
  }
}
