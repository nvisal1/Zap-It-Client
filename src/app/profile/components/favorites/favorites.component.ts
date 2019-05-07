import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  @Input() projects: [];

  @Output() removeFavoriteProject = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  removeFavorite(projectId: string) {
    this.removeFavoriteProject.emit(projectId);
  }

}
