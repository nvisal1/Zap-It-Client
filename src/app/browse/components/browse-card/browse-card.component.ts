import { Component, OnInit, Input } from '@angular/core';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-browse-card',
  templateUrl: './browse-card.component.html',
  styleUrls: ['./browse-card.component.css']
})
export class BrowseCardComponent implements OnInit {

  @Input() project: {};
  author: {};
  authorSubscription: Subscription;

  constructor(
    private apollo: Apollo,
  ) { }

  ngOnInit() {
    const authorQuery = gql`
      query{
        user(
          id:"${this.project['authorId']}"
        )
        {
          id
          name
          email
        }
      }
    `;

    this.authorSubscription = this.apollo.watchQuery<any>({
      query: authorQuery
    })
    .valueChanges
    .subscribe(({data, errors}) => {
      this.author = data.user;
    });
  }

}
