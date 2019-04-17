import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.css']
})
export class EnvironmentsComponent implements OnInit {
  @Input() environments: [];
  constructor() { }

  ngOnInit() {
  }

}
