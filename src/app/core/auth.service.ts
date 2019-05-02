import { Injectable } from '@angular/core';
import * as jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: {};

  constructor() { }

  login(token: string) {
    localStorage.setItem('TOKEN', token);
    const decoded = jwt(token);
    this.user = decoded['data'];
  }
}
