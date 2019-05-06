import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @Input() projects: [];
  @Input() currentUser: {};
  @Output() newProject = new EventEmitter();
  @Output() projectId = new EventEmitter();
  @Output() editProject = new EventEmitter();
  @Output() deleteProject = new EventEmitter();

  constructor(
    public auth: AuthService
  ) { }

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
