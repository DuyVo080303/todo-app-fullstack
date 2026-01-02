import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiResponse, TodoListApi } from '../models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/todo_list`;

  getList() {
    return this.http
      .get<ApiResponse<TodoListApi[]>>(this.baseUrl)
      .pipe(map((res) => res.data.map((list) => ({
        id: list.id,
        name: list.title,
        count: 0
      }))))
  }

  createList(body: { title: string }) {
    return this.http
      .post<ApiResponse<TodoListApi>>(this.baseUrl, body, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<ApiResponse<TodoListApi>>) => ({
          status: res.status,
          list: {
            id: res.body!.data.id,
            name: res.body!.data.title,
            count: 0,
          },
        }))
      );
  }

  updateList(id: number, body: { title: string }) {
    return this.http
      .put<ApiResponse<TodoListApi>>(`${this.baseUrl}/${id}`, body, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<ApiResponse<TodoListApi>>) => ({
          status: res.status,
          list: {
            id: res.body!.data.id,
            name: res.body!.data.title,
            count: 0,
          },
        }))
      );
  }

  deleteList(id: number) {
    return this.http
      .delete(`${this.baseUrl}/${id}`, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => ({
          status: res.status,
        }))
      );
  }
}