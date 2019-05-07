import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/core/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private apollo: Apollo,
    private router: Router,
    private nav: NavbarService,
  ) { }

  ngOnInit() {
    this.nav.hide();
  }

  async login(params: {
    username: string,
    password: string,
  }) {

    const login = gql`
      query {
        login(
          username: "${params.username}",
          password: "${params.password}"
        ) {
          token
        }
      }
    `;

    this.loginSubscription = this.apollo.watchQuery<any>({
      query: login
    })
    .valueChanges
    .subscribe(({data, errors}) => {
      if (data.login.token) {
        this.auth.login(data.login.token);
        this.router.navigate(['/profile']);
        this.loginSubscription.unsubscribe();
      }
    });
  }
}
