import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { MatDialogRef } from '@angular/material';

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
export class NewProjectComponent implements OnInit, OnDestroy {

  frameworkSubscription: Subscription;
  frameworks: [];
  selectedFrameworkId = 0;
  submitSubscription: Subscription;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    thumbnail: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    directoryName: new FormControl('', Validators.required),
    port: new FormControl('', Validators.required),
  });

  constructor(
    private apollo: Apollo,
    private auth: AuthService,
    public dialogRef: MatDialogRef<NewProjectComponent>
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

  submit() {
    const newProject = gql`query{
      insertProject(
        name: "${this.form.value.name}",
        url: "${this.form.value.url}",
        description: "${this.form.value.description}",
        authorId: "${this.auth.user['id']}",
        thumbnail: "${this.form.value.thumbnail}",
        directoryName: "${this.form.value.directoryName}",
        port: "${this.form.value.port}",
        frameworkId: "${this.selectedFrameworkId}"
      )
    }`;

    this.submitSubscription = this.apollo.watchQuery<any>({
      query: newProject
    })
    .valueChanges
    .subscribe(({data, errors}) => {
      console.log(data);
      this.dialogRef.close();
    });
  }

  selectFramework(id: number) {
    this.selectedFrameworkId = id;
  }

  ngOnDestroy() {
    this.frameworkSubscription.unsubscribe();
    this.submitSubscription.unsubscribe();
  }
}
