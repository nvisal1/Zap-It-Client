import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @Input() projects: [];

  @Output() projectId = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  startProject(id: string) {
    this.projectId.emit(id);
  }
}
