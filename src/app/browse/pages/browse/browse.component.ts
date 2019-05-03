import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  query: string;
  searchSubscription: Subscription;
  results: [];

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const paramObj = {...params.keys, ...params};
      this.query = paramObj['params']['text'];
    });

    const searchQuery = gql`
      query{
        searchProjects(
          text:"${this.query}"
        )
        {
          id
          name
          url
          description
          authorId
          thumbnail
        }
      }
    `;

    this.searchSubscription = this.apollo.watchQuery<any>({
      query: searchQuery
    })
    .valueChanges
    .subscribe(({data, errors}) => {
      console.log(data.searchProjects);
      this.results = data.searchProjects;
    });
  }
}
