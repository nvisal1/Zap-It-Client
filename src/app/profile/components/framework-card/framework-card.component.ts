import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-framework-card',
  templateUrl: './framework-card.component.html',
  styleUrls: ['./framework-card.component.css']
})
export class FrameworkCardComponent implements OnInit {
  @Input() framework: any;
  @Input() selected: number;

  @Output() select = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  selectCard() {
    this.select.emit(this.framework.id);
  }
}
