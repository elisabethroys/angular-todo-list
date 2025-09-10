import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  public todos$ = new Observable<Todo[]>();
  public filteredTodos$ = new Observable<Todo[]>();
  showOnlyCompleted = false;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos();
    this.applyFilter();
  }

  applyFilter(): void {
    this.filteredTodos$ = this.todos$.pipe(
      map((todos) =>
        this.showOnlyCompleted ? todos.filter((todo) => todo.completed) : todos.filter((todo) => !todo.completed)
      )
    );
  }

  filterList() {
    this.showOnlyCompleted = !this.showOnlyCompleted;
    this.applyFilter();
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe({
      next: (updated) => {
        console.log('Todo oppdatert:', updated);
        this.applyFilter();
      },
      error: (err) => {
        console.error('Feil ved oppdatering:', err);
      },
    });
  }

  newTodo(title: string): void {
    this.todoService.addTodo(title).subscribe({
      next: () => {
        this.applyFilter();
      },
      error: (err) => {
        console.error('Feil ved POST:', err);
      },
    });
  }
}
