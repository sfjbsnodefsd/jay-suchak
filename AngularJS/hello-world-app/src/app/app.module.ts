import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormsComponent } from './Components/user-forms/user-forms.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { HomeComponent } from './Components/home/home.component';
import { RegisteredUsersComponent } from './Components/registered-users/registered-users.component';
import { PipesDemoComponent } from './Components/pipes-demo/pipes-demo.component';
import { EllipsisPipe } from './Pipes/ellipsis.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserFormsComponent,
    NavBarComponent,
    HomeComponent,
    RegisteredUsersComponent,
    PipesDemoComponent,
    EllipsisPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
