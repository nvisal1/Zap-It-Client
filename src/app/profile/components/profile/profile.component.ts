import { Component, OnInit, Input } from '@angular/core';
import * as md5 from 'md5';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() currentUser: any;

  constructor() { }

  ngOnInit() {
  }

  gravatarImage(size): string {
    // r=pg checks the rating of the Gravatar image
    return (
      'https://www.gravatar.com/avatar/' +
      md5(this.currentUser.email) +
      '?s=' +
      size +
      '?r=pg&d=identicon'
    );
  }

}
