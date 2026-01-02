import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiResponse } from '../models';
import { TodoItemApi, PriorityApi, PriorityUi } from '../models';
import { map } from 'rxjs';


const toUiPriority = (p: PriorityApi): PriorityUi => {
  if (p === 'HIGH') return 'High';
  if (p === 'MEDIUM') return 'Medium';
  return 'Low';
};

@Injectable({
  providedIn: 'root',
})

export class TodoItemService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}`;

  getItems(listId: number) {
    return this.http
      .get<ApiResponse<TodoItemApi[]>>(`${this.baseUrl}/todo_list/${listId}/items`)
      .pipe(
        map(res => res.data.map(item => ({
          id: item.id,
          title: item.title,
          dueDate: new Date(item.dueDate),
          priority: toUiPriority(item.priority),
          completed: item.completed,
        })))
      );
  }

  createItems(listId: number, body: Partial<TodoItemApi>) {
    return this.http
      .post<ApiResponse<TodoItemApi>>(`${this.baseUrl}/todo_list/${listId}/items`, body, { observe: 'response' })
      .pipe(
        map((resp: HttpResponse<ApiResponse<TodoItemApi>>) => ({
          status: resp.status,
          data: resp.body!.data,
        }))
      );
  }

  updateItem(itemId: number, body: Partial<TodoItemApi>) {
    return this.http
      .patch<ApiResponse<TodoItemApi>>(`${this.baseUrl}/todo_item/${itemId}`, body, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<ApiResponse<TodoItemApi>>) => {
          const apiItem = res.body!.data;

          return {
            status: res.status,
            item: {
              id: apiItem.id,
              title: apiItem.title,
              dueDate: new Date(apiItem.dueDate),
              priority: toUiPriority(apiItem.priority),
              completed: apiItem.completed,
            },
          };
        })
      );
  }

  deleteItem(itemId: number) {
  return this.http
    .delete(`${this.baseUrl}/todo_item/${itemId}`, { observe: 'response' })
    .pipe(
      map((res: HttpResponse<any>) => ({ status: res.status }))
    );
}
}
