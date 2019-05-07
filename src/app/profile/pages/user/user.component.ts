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
import { DeleteUserComponent } from '../../components/delete-user/delete-user.component';
import { EditProjectComponent } from '../../components/edit-project/edit-project.component';
import { DeleteProjectComponent } from '../../components/delete-project/delete-project.component';
import { ActivatedRoute } from '@angular/router';

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
  startProjectSubscription: Subscription;
  stopProjectSubscription: Subscription;
  favoriteProjectsSubscription: Subscription;

  currentUserProjects: any;
  currentUserFavoriteProjects: any;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    public dialog: MatDialog,
    private auth: AuthService,
    public nav: NavbarService,
  ) { }

  ngOnInit() {

    this.nav.show();

    this.route.queryParamMap.subscribe(async params => {
      const paramObj = {...params.keys, ...params};
      if (paramObj['params']['user']) {
        const userId = paramObj['params']['user'];
        this.getUser(userId);
        this.fetchProjects(userId);
        this.fetchFavoriteProjects(userId);
      } else {
        this.currentUser = this.auth.user;
        this.fetchProjects(this.currentUser.id);
        this.fetchFavoriteProjects(this.currentUser.id);
      }
    });
  }

  fetchProjects(userId: string) {
    const currentUserProjectsQuery = gql`
      query {
        userProjects (
          authorId: "${userId}"
        ) {
          id
          name
          url
          description
          authorId
          thumbnail
          environmentId
        }
      }
    `;

    this.projectsSubscription = this.apollo.watchQuery<any>({
      query: currentUserProjectsQuery
    })
    .valueChanges
    .subscribe(({data}) => {
      this.currentUserProjects = data.userProjects;
    });
  }

  fetchFavoriteProjects(userId: string) {
    const currentUserFavoriteProjectsQuery = gql`
      query {
        fetchUserFavorites (
          userId: "${userId}"
        ) {
          id
          name
          url
          description
          authorId
          thumbnail
          environmentId
        }
      }
    `;

    this.favoriteProjectsSubscription = this.apollo.watchQuery<any>({
      query: currentUserFavoriteProjectsQuery
    })
    .valueChanges
    .subscribe(({data}) => {
      this.currentUserFavoriteProjects = data.fetchUserFavorites;
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

  openNewProjectModal(userId: string) {
    this.dialog.open(NewProjectComponent, {
      height: '900px',
      width: '700px',
    });
  }

  openDeleteUserModal(userId: string) {
    this.dialog.open(DeleteUserComponent, {
      height: '500px',
      width: '700px',
    });
  }

  openEditProjectModal(projectId: string) {
    this.dialog.open(EditProjectComponent, {
      height: '900px',
      width: '700px',
      data: {
        project: this.currentUserProjects.filter(project => project.id === projectId)[0],
      }
    });
  }

  openDeleteProjectModal(projectId: string) {
    this.dialog.open(DeleteProjectComponent, {
      height: '500px',
      width: '700px',
      data: {
        project: this.currentUserProjects.filter(project => project.id === projectId)[0],
      }
    });
  }

  getUser(userId: string) {
    const getUserQuery = gql`
      query{
        user(
          id:"${userId}"
        )
        {
          id
          name
          username
          email
          jobType
          bio
        }
      }
    `;

    this.userSubscription = this.apollo.watchQuery<any>({
      query: getUserQuery
    })
    .valueChanges
    .subscribe(({data, errors}) => {
      this.currentUser = data.user;
    });
  }

  addToFavorites(projectId: string) {
    const addToFavoritesQuery = gql`
      query{
        addToFavorites(
          userId: "${this.auth.user['id']}"
          projectId: "${projectId}"
        )
      }
    `;

    this.userSubscription = this.apollo.watchQuery<any>({
      query: addToFavoritesQuery
    })
    .valueChanges
    .subscribe(({data, errors}) => {
      console.log(data);
    });
  }
}
