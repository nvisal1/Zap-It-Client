import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const getAllFrameworks = gql`
  query {
    getAllFrameworks {
      id
      name
      startCmd
      link
      logo
    }
  }
`;

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  frameworkSubscription: Subscription;
  frameworks: [];

  constructor(
    private apollo: Apollo,
  ) { }

  ngOnInit() {
    this.frameworkSubscription = this.apollo.watchQuery<any>({
      query: getAllFrameworks,
    })
    .valueChanges
    .subscribe(({data}) => {
      this.frameworks = data.getAllFrameworks;
    });
  }
}
