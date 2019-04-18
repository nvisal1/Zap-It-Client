import { Component, OnInit } from '@angular/core';
import * as md5 from 'md5';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  gravatarImage(size): string {
    // r=pg checks the rating of the Gravatar image
    return (
      'https://www.gravatar.com/avatar/' +
      md5('sample.gmail.com') +
      '?s=' +
      size +
      '?r=pg&d=identicon'
    );
  }

}
