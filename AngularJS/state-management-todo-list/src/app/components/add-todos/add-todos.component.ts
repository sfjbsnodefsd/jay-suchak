import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoAdd } from 'src/app/actions/todo.actions';
import { Todo } from 'src/app/Entity/Todo';

@Component({
  selector: 'app-add-todos',
  templateUrl: './add-todos.component.html',
  styleUrls: ['./add-todos.component.css']
})
export class AddTodosComponent implements OnInit {

  AddTodo(todo: string){
    const newTodo = new Todo();
    newTodo.title = todo;
    this.store.dispatch(new TodoAdd(newTodo))
  }
  constructor(private store: Store <{ todos: Todo[]}>) { }

  ngOnInit(): void {
  }

}
