import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private http = inject(HttpClient);

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}`);
  }

  public addTodo(title: string): Observable<Todo> {
    const todo = {
      title: title
    };
    return this.http.post<Todo>(`${environment.apiUrl}`, todo);
  }

  public updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${environment.apiUrl}/${updatedTodo.id}`, updatedTodo);
  }

  /*async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo);

    return foundTodo;
  }*/
}
