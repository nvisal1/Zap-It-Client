import { Component, OnInit } from '@angular/core';
import * as md5 from 'md5';
import { NavbarService } from 'src/app/core/navbar.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public nav: NavbarService,
    public auth: AuthService,
    ) { }

  ngOnInit() {}

  gravatarImage(size): string {
    // r=pg checks the rating of the Gravatar image
    return (
      'https://www.gravatar.com/avatar/' +
      md5(this.auth.user['email']) +
      '?s=' +
      size +
      '?r=pg&d=identicon'
    );
  }

}
