import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  public todos$ = new Observable<Todo[]>();

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos();
    this.todos$.subscribe((todos) => {
      todos.forEach((todo) => {
        console.log(todo.title);
      });
    });
  }

  //todos = this.todoService.todos;

  /*updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }*/

  newTodo(title: string): void {
  this.todoService.addTodo(title).subscribe({
    next: () => {
      this.todos$ = this.todoService.getTodos(); // oppdater listen etter POST
    },
    error: (err) => {
      console.error('Feil ved POST:', err);
    },
  });
}

}
