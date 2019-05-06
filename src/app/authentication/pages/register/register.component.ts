import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/core/navbar.service';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerSubscription: Subscription;

  constructor(
    private router: Router,
    private auth: AuthService,
    private apollo: Apollo,
    private nav: NavbarService,
  ) { }

  ngOnInit() {
    this.nav.hide();
  }

  async register(params: {
    name: string,
    username: string,
    email: string,
    password: string,
  }) {

    console.log(params);

    const register = gql`
      query {
        register(
          name: "${params.name}",
          username: "${params.username}",
          email: "${params.email}",
          password: "${params.password}",
          bio: "",
          jobType: ""
        ) {
          token
        }
      }
    `;

    this.registerSubscription = this.apollo.watchQuery<any>({
      query: register
    })
    .valueChanges
    .subscribe(({data, errors}) => {
      if (data.register.token) {
        this.auth.login(data.register.token);
        this.router.navigate(['/profile']);
      }
    });
  }

}
