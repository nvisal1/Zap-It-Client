import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BuildComponent } from '../../components/build/build.component';

const currentUser = gql`
  query {
    user (
      id: 2
    ) {
      id
      name
      username
      email
      jobType
      bio
    }
  }
`;

const currentUserProjects = gql`
  query {
    userProjects (
      authorId: 2
    ) {
      id
      name
      url
      description
      authorId
      thumbnail
    }
  }
`;

const currentUserEnvironments = gql`
  query {
    getUserEnvironments (
      authorId: 2
    ) {
      id
      docker
      git
      node
      authorId
      name
    }
  }
`;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  loading: boolean;
  currentUser: any;
  userSubscription: Subscription;
  projectsSubscription: Subscription;
  environmentsSubscription: Subscription;
  startProjectSubscription: Subscription;
  stopProjectSubscription: Subscription;

  currentUserProjects: any;
  currentUserEnvironments: any;

  constructor(
    private apollo: Apollo,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.userSubscription = this.apollo.watchQuery<any>({
      query: currentUser
    })
    .valueChanges
    .subscribe(({data}) => {
      this.currentUser = data.user;
    });

    this.projectsSubscription = this.apollo.watchQuery<any>({
      query: currentUserProjects
    })
    .valueChanges
    .subscribe(({data}) => {
      this.currentUserProjects = data.userProjects;
    });

    this.environmentsSubscription = this.apollo.watchQuery<any>({
      query: currentUserEnvironments
    })
    .valueChanges
    .subscribe(({data}) => {
      this.currentUserEnvironments = data.getUserEnvironments;
    });
  }

  startProject(id: string) {
    const startProject = gql`
      query {
        startProject(
          id: ${id}
        ) {
          code
        }
      }
    `;

    const stopProject = gql`
      query {
        stopProject(
          id: ${id}
        )
      }
    `;

    this.startProjectSubscription = this.apollo.watchQuery<any>({
      query: startProject,
      notifyOnNetworkStatusChange: true,
    })
    .valueChanges
    .subscribe(({data, loading}) => {
      this.loading = loading;
      const dialogRef = this.dialog.open(BuildComponent, {
        height: '100%',
        width: '600px',
        data: {
          code: data.startProject.code,
          loading,
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.stopProjectSubscription = this.apollo.watchQuery<any>({
          query: stopProject,
        })
        .valueChanges
        .subscribe(() => {});
      });
    });
  }
}
