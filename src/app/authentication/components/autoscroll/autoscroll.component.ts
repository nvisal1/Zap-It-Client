import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autoscroll',
  templateUrl: './autoscroll.component.html',
  styleUrls: ['./autoscroll.component.css']
})
export class AutoscrollComponent implements OnInit {

  cards = [1, 2, 3, 4];

  constructor() { }

  ngOnInit() {
  }

}
