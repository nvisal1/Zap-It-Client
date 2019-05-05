import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'src/app/core/auth.service';
import gql from 'graphql-tag';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  deleteUserSubscription: Subscription;

  constructor(
    private apollo: Apollo,
    private auth: AuthService,
  ) { }

  ngOnInit() {
  }

  deleteUser() {
    const deleteUser = gql`
      query {
        deleteUSer(
          id: ${this.auth.user['id']}
        )
      }
    `;

    this.deleteUserSubscription = this.apollo.watchQuery<any>({
      query: deleteUser,
    })
    .valueChanges
    .subscribe(({data}) => {
      this.auth.logout();
    });

  }
}
