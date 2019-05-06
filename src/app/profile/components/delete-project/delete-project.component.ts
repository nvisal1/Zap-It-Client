import { Component, OnInit, Inject } from '@angular/core';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {

  deleteProjectSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<DeleteProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {},
    private apollo: Apollo,
  ) { }

  ngOnInit() {
  }

  deleteProject() {
    const deleteProject = gql`
      query {
        deleteProject(
          id: "${this.data['project']['id']}"
        )
      }
    `;

    this.deleteProjectSubscription = this.apollo.watchQuery<any>({
      query: deleteProject,
    })
    .valueChanges
    .subscribe(({data}) => {
      console.log(data);
    });

  }

}
