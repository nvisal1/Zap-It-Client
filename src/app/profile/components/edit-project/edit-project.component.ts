import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  fetchEnvironmentSubscription: Subscription;
  environment = {
    port: '',
    directoryName: '',
    frameworkId: 0,
  };

  form = new FormGroup({
    name: new FormControl(this.data['project']['name'], Validators.required),
    url: new FormControl(this.data['project']['url'], Validators.required),
    description: new FormControl(this.data['project']['description'], Validators.required),
    thumbnail: new FormControl(this.data['project']['thumbnail'], Validators.required),
    port: new FormControl(this.environment['port'], Validators.required),
    directoryName: new FormControl(this.environment['directoryName'], Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<EditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {},
    private apollo: Apollo,
  ) { }

  ngOnInit() {

    const fetchEnvironment = gql`
      query {
        getEnvironment(
          id: "${this.data['project']['environmentId']}"
        ) {
          port
          directoryName
          frameworkId
        }
      }
    `;

    this.fetchEnvironmentSubscription = this.apollo.watchQuery<any>({
      query: fetchEnvironment,
    })
    .valueChanges
    .subscribe(({data}) => {
      this.environment = data.getEnvironment;
      this.form.controls['port'].setValue(this.environment.port);
      this.form.controls['directoryName'].setValue(this.environment.directoryName);
    });
  }
}
