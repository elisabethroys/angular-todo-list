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

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe({
      next: (updated) => {
        console.log('Todo oppdatert:', updated);
      },
      error: (err) => {
        console.error('Feil ved oppdatering:', err);
      },
    });
  }

  newTodo(title: string): void {
    this.todoService.addTodo(title).subscribe({
      next: () => {
        this.todos$ = this.todoService.getTodos();
      },
      error: (err) => {
        console.error('Feil ved POST:', err);
      },
    });
  }
}
