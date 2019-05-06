import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/pages/login/login.component';
import { BrowseComponent } from './browse/pages/browse/browse.component';
import { UserComponent } from './profile/pages/user/user.component';
import { RegisterComponent } from './authentication/pages/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: BrowseComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'profile',
    component: UserComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
