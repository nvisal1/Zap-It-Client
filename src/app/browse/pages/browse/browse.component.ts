import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit, OnDestroy {

  query: string;
  searchSubscription: Subscription;
  results: [];
  navigationSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private router: Router,
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.performSearch();
      }
    });
  }

  ngOnInit() {
   this.performSearch();
  }

  async performSearch() {
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
    this.route.queryParamMap.subscribe(params => {
      const paramObj = {...params.keys, ...params};
      this.query = paramObj['params']['text'];
    });

    this.searchSubscription = this.apollo.watchQuery<any>({
      query: searchQuery
    })
    .valueChanges
    .subscribe(({data, errors}) => {
      this.results = data.searchProjects;
    });
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }
}
