import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})
export class BuildComponent implements OnInit {
  @Input() code: string;

  constructor(
    public dialogRef: MatDialogRef<BuildComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {},
  ) { }

  ngOnInit() {
  }

}
