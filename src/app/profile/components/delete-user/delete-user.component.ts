import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'src/app/core/auth.service';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit, OnDestroy {

  deleteUserSubscription: Subscription;

  constructor(
    private router: Router,
    private apollo: Apollo,
    private auth: AuthService,
    public dialogRef: MatDialogRef<DeleteUserComponent>
  ) { }

  ngOnInit() {
  }

  deleteUser() {
    const deleteUser = gql`
      query {
        deleteUser(
          id: "${this.auth.user['id']}"
        )
      }
    `;

    this.deleteUserSubscription = this.apollo.watchQuery<any>({
      query: deleteUser,
    })
    .valueChanges
    .subscribe(({data}) => {
      this.auth.logout();
      this.router.navigate(['/login']);
      this.dialogRef.close();
    });

  }

  ngOnDestroy() {
    this.deleteUserSubscription.unsubscribe();
  }
}
