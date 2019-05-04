import { Component, OnInit } from '@angular/core';
import * as md5 from 'md5';
import { NavbarService } from 'src/app/core/navbar.service';
import { AuthService } from 'src/app/core/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  form = new FormGroup({
    text: new FormControl(''),
  });

  constructor(
    public nav: NavbarService,
    public auth: AuthService,
    private router: Router,
    ) {}

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

  search() {
    if (this.router.url.match(/\/text.*/)) {
      window.location.reload(false);
    } else {
      this.router.navigate(['/browse'], { queryParams: { text: this.form.value.text } });
    }
  }

}
