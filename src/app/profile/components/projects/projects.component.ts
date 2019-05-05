import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @Input() projects: [];
  @Output() newProject = new EventEmitter();
  @Output() projectId = new EventEmitter();
  @Output() editProject = new EventEmitter();
  @Output() deleteProject = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  startProject(id: string) {
    this.projectId.emit(id);
  }

  onNewProject() {
    this.newProject.emit();
  }

  onEditProject(projectId: string) {
    this.editProject.emit(projectId);
  }

  onDeleteProject(projectId: string) {
    this.deleteProject.emit(projectId);
  }
}
