import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  @Input() project: any;
  @Input() isFavorite = false;

  @Output() projectId = new EventEmitter();
  @Output() editProject = new EventEmitter();
  @Output() deleteProject = new EventEmitter();
  @Output() favoriteProject = new EventEmitter();
  @Output() removeFavoriteProject = new EventEmitter();

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {}

  startProject() {
    this.projectId.emit(this.project.id);
  }

  edit() {
    this.editProject.emit(this.project.id);
  }

  delete() {
    this.deleteProject.emit(this.project.id);
  }

  favorite() {
    this.favoriteProject.emit(this.project.id);
  }

  removeFavorite() {
    this.removeFavoriteProject.emit(this.project.id);
  }
}
