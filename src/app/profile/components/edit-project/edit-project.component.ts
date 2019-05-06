import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  fetchEnvironmentSubscription: Subscription;
  frameworkSubscription: Subscription;
  submitSubscription: Subscription;
  environment = {
    port: '',
    directoryName: '',
    frameworkId: 0,
  };
  selectedFrameworkId;
  frameworks: [];

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
    private auth: AuthService,
  ) { }

  ngOnInit() {

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

    this.frameworkSubscription = this.apollo.watchQuery<any>({
      query: getAllFrameworks,
    })
    .valueChanges
    .subscribe(({data}) => {
      this.frameworks = data.getAllFrameworks;
    });

    this.fetchEnvironmentSubscription = this.apollo.watchQuery<any>({
      query: fetchEnvironment,
    })
    .valueChanges
    .subscribe(({data}) => {
      this.environment = data.getEnvironment;
      this.form.controls['port'].setValue(this.environment.port);
      this.form.controls['directoryName'].setValue(this.environment.directoryName);
      this.selectedFrameworkId = this.environment.frameworkId;
    });
  }

  submit() {
    const editProject = gql`query{
      editProject(
        name: "${this.form.value.name}",
        url: "${this.form.value.url}",
        description: "${this.form.value.description}",
        authorId: "${this.auth.user['id']}",
        thumbnail: "${this.form.value.thumbnail}",
        directoryName: "${this.form.value.directoryName}",
        port: "${this.form.value.port}",
        frameworkId: "${this.selectedFrameworkId}",
        environmentId: "${this.data['project']['environmentId']}"
      )
    }`;

    this.submitSubscription = this.apollo.watchQuery<any>({
      query: editProject
    })
    .valueChanges
    .subscribe(({data, errors}) => {
      console.log(data);
    });
  }

  selectFramework(id: number) {
    this.selectedFrameworkId = id;
  }
}
