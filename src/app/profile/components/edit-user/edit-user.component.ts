import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'src/app/core/auth.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editUserSubscription: Subscription;

  form = new FormGroup({
    name: new FormControl(this.auth.user['name'], Validators.required),
    username: new FormControl(this.auth.user['username'], Validators.required),
    email: new FormControl(this.auth.user['email'], Validators.required),
    job: new FormControl(this.auth.user['jobType'], Validators.required),
    bio: new FormControl(this.auth.user['bio'], Validators.required),
  });

  constructor(
    private apollo: Apollo,
    private auth: AuthService,
    public dialogRef: MatDialogRef<EditUserComponent>
  ) { }

  ngOnInit() {}

  submit() {
    const editUser = gql`query{
      editUser(
        id: "${this.auth.user['id']}",
        name: "${this.form.value.name}",
        username: "${this.form.value.username}",
        email: "${this.form.value.email}",
        jobType: "${this.form.value.job}",
        bio: "${this.form.value.bio}"
      )
    }`;

    this.editUserSubscription = this.apollo.watchQuery<any>({
      query: editUser
    })
    .valueChanges
    .subscribe(({data, errors}) => {
      console.log(data);
      this.dialogRef.close();
    });
  }

}
