import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  arr = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3];

  constructor() { }

  ngOnInit() {
  }

}
