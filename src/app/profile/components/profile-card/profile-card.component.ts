import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  @Input() project: any;

  @Output() projectId = new EventEmitter();
  @Output() editProject = new EventEmitter();
  @Output() deleteProject = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  startProject() {
    this.projectId.emit(this.project.id);
  }

  edit() {
    this.editProject.emit(this.project.id);
  }

  delete() {
    this.deleteProject.emit(this.project.id);
  }
}
