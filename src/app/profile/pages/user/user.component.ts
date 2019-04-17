import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, Subscription } from 'rxjs';
import {map} from 'rxjs/operators';


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

  currentUserProjects: any;
  currentUserEnvironments: any;

  constructor(private apollo: Apollo) { }

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
}
