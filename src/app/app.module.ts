import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import { RegisterComponent } from './authentication/pages/register/register.component';
import { UserComponent } from './profile/pages/user/user.component';
import { OtherComponent } from './profile/pages/other/other.component';
import { BrowseComponent } from './browse/pages/browse/browse.component';
import { LoginComponent } from './authentication/pages/login/login.component';
import { BrowseCardComponent } from './browse/components/browse-card/browse-card.component';
import { FilterComponent } from './browse/components/filter/filter.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProfileComponent } from './profile/components/profile/profile.component';
import { ProjectsComponent } from './profile/components/projects/projects.component';
import { EnvironmentsComponent } from './profile/components/environments/environments.component';
import { ProfileCardComponent } from './profile/components/profile-card/profile-card.component';
import { EnvCardComponent } from './profile/components/env-card/env-card.component';
import { AutoscrollComponent } from './authentication/components/autoscroll/autoscroll.component';
import { SoftwareCardComponent } from './authentication/components/software-card/software-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    OtherComponent,
    BrowseComponent,
    BrowseCardComponent,
    FilterComponent,
    NavbarComponent,
    ProfileComponent,
    ProjectsComponent,
    EnvironmentsComponent,
    ProfileCardComponent,
    EnvCardComponent,
    AutoscrollComponent,
    SoftwareCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: environment.apiEndpoint + `/zap`
        })
      };
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
