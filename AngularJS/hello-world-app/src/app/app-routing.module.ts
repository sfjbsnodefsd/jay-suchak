import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { UserFormsComponent } from './Components/user-forms/user-forms.component';

const routes: Routes = [{path: "", component: HomeComponent}, {path: 'register', component: UserFormsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
