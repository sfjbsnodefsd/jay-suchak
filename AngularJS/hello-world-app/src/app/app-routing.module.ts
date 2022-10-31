import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { PipesDemoComponent } from './Components/pipes-demo/pipes-demo.component';
import { RegisteredUsersComponent } from './Components/registered-users/registered-users.component';
import { UserFormsComponent } from './Components/user-forms/user-forms.component';

const routes: Routes = [{path: "", component: HomeComponent}, {path: 'register', component: UserFormsComponent}, {path: 'register-users', component: RegisteredUsersComponent}, {path:'pipes-demo', component:PipesDemoComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
