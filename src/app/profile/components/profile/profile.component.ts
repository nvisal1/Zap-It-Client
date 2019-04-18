import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as md5 from 'md5';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() currentUser: any;

  @Output() userId = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  gravatarImage(size): string {
    return (
      'https://www.gravatar.com/avatar/' +
      md5(this.currentUser.email) +
      '?s=' +
      size +
      '?r=pg&d=identicon'
    );
  }

  editUser() {
    this.userId.emit(this.currentUser.id);
  }
}
