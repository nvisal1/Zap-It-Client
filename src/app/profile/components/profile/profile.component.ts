import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as md5 from 'md5';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() currentUser: any;

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

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
    this.edit.emit(this.currentUser.id);
  }

  deleteUser() {
    this.delete.emit(this.currentUser.id);
  }
}
