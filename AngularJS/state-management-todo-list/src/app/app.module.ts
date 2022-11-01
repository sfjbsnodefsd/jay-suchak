import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule, StoreRootModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoReducer } from './reducers/todo.reducer';
import { DisplayTodosComponent } from './components/display-todos/display-todos.component';
import { AddTodosComponent } from './components/add-todos/add-todos.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayTodosComponent,
    AddTodosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({todos:TodoReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
