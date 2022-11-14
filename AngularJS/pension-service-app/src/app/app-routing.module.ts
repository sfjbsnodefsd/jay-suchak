import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { PensionerHomeComponent } from './Components/pensioner-home/pensioner-home.component';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },

  // home route protected by auth guard
  { path: 'home', component: PensionerHomeComponent, canActivate: [] },

  // otherwise redirect to home
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
