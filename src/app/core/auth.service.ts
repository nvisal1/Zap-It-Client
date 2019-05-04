import { Injectable } from '@angular/core';
import * as jwt from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: {};

  constructor(
    private router: Router,
  ) {
    if (localStorage.getItem('TOKEN')) {
      this.user = jwt(localStorage.getItem('TOKEN'))['data'];
    } else {
      this.router.navigate(['/login']);
    }
  }

  login(token: string) {
    localStorage.setItem('TOKEN', token);
    const decoded = jwt(token);
    this.user = decoded['data'];
  }

  logout() {
    localStorage.removeItem('TOKEN');
    this.user = {};
  }
}
