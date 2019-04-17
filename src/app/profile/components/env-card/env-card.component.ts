import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-env-card',
  templateUrl: './env-card.component.html',
  styleUrls: ['./env-card.component.css']
})
export class EnvCardComponent implements OnInit {
  @Input() environment: any;
  constructor() { }

  ngOnInit() {
  }

}
