import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { BuildComponent } from '../../components/build/build.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';
import { NewProjectComponent } from '../../components/new-project/new-project.component';
import { AuthService } from 'src/app/core/auth.service';
import { NavbarService } from 'src/app/core/navbar.service';

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
    private auth: AuthService,
    public nav: NavbarService,
  ) { }

  ngOnInit() {

    this.nav.show();

    this.currentUser = this.auth.user;

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

    // open loading modal
    const loadingDialogRef = this.dialog.open(LoadingComponent, {
        height: '400px',
        width: '600px',
    });

    this.startProjectSubscription = this.apollo.watchQuery<any>({
      query: startProject,
      notifyOnNetworkStatusChange: true,
    })
    .valueChanges
    .subscribe(({data}) => {
      loadingDialogRef.close();
      const buildDialogRef = this.dialog.open(BuildComponent, {
        height: '80%',
        width: '600px',
        data: {
          code: data.startProject.code,
        }
      });

      buildDialogRef.afterClosed().subscribe(result => {
        this.stopProjectSubscription = this.apollo.watchQuery<any>({
          query: stopProject,
        })
        .valueChanges
        .subscribe(() => {});
      });
    });
  }

  openEditUserModal(userId: string) {
    this.dialog.open(EditUserComponent, {
      height: '700px',
      width: '700px',
    });
  }

  openNewProjectModal() {
    this.dialog.open(NewProjectComponent, {
      height: '700px',
      width: '700px',
    });
  }
}
