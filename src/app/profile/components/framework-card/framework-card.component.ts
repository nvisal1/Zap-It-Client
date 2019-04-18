import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-framework-card',
  templateUrl: './framework-card.component.html',
  styleUrls: ['./framework-card.component.css']
})
export class FrameworkCardComponent implements OnInit {
  @Input() framework: any;

  constructor() { }

  ngOnInit() {
  }

}
