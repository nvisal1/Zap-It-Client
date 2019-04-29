import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginSubscription: Subscription;

  constructor(
    private apollo: Apollo,
  ) { }

  ngOnInit() {
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
    .subscribe(({data}) => {
      console.log(data);
    });
  }
}
