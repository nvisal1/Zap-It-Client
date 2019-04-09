import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import { RegisterComponent } from './authentication/pages/register/register.component';
import { UserComponent } from './profile/pages/user/user.component';
import { OtherComponent } from './profile/pages/other/other.component';
import { BrowseComponent } from './browse/pages/browse/browse.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    OtherComponent,
    BrowseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
