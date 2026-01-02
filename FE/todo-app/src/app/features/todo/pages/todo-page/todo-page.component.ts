import { Component, OnInit } from '@angular/core';
import { ListSidebarComponent } from '../../components/list-sidebar/list-sidebar.component';
import { ItemPanelComponent } from '../../components/item-panel/item-panel.component';
import { TodoItem, TodoItemApi, TodoList, TodoListApi } from '../../models';
import { MatIconModule } from '@angular/material/icon';
import { TodoListService } from '../../services/todo-list.service';
import { inject } from '@angular/core';
import { TodoItemService } from '../../services/todo-item.service';
import { AuthService } from '../../../auth/services/authService';
import { Router } from '@angular/router';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-todo-page',
  imports: [ListSidebarComponent, ItemPanelComponent, MatIconModule],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss',
})

export class TodoPageComponent implements OnInit {

  lists: TodoList[] = [];
  items: TodoItem[] = [];
  selectedListId: number | null = null;

  listService = inject(TodoListService)
  itemService = inject(TodoItemService)
  authService = inject(AuthService)
  router = inject(Router)
  private cdr = inject(ChangeDetectorRef);

  get selectedList() {
    return this.lists.find(l => l.id === this.selectedListId) ?? null;
  }

  // Create function to load item and lists

  loadItems(listId: number) {
    this.itemService.getItems(listId).subscribe({
      next: (items) => {
        // this.items = [...items];
        this.items = items;
        this.cdr.detectChanges();
      },
      error: (err) => console.log('getItems error', err),
    });
  }



  loadLists() {
    this.listService.getList().subscribe({
      next: (lists) => {
        // this.lists = [...lists];
        this.lists = lists;
        this.cdr.detectChanges();

        if (this.selectedListId == null && this.lists.length) {
          this.selectedListId = this.lists[0].id;
          this.loadItems(this.selectedListId);
        }
      },
      error: (err) => console.log(err),
    });
  }



  ngOnInit(): void {
    this.loadLists()
  }

  onSelectList(listId: number) {
    this.selectedListId = listId;
    this.loadItems(listId);
  }


  onCreateList(title: string) {
    this.listService.createList({ title }).subscribe({
      next: (res) => {
        this.lists = [...this.lists, res.list];
        this.cdr.detectChanges();
        this.loadLists();
        console.log("STATUS", res.status)
      },
      error: (err) => console.log('create list error', err),
    });
  }



  onCreateItem(payload: { title: string; dueDate: string; priority: 'LOW' | 'MEDIUM' | 'HIGH' }) {
    if (!this.selectedListId) return;

    const listId = this.selectedListId;

    const body: Partial<TodoItemApi> = {
      title: payload.title,
      dueDate: payload.dueDate,
      priority: payload.priority,
      completed: false,
    };

    this.itemService.createItems(listId, body).subscribe({
      next: (res) => {
        console.log('STATUS', res.status)
        this.loadItems(listId);
      },
      error: (err) => console.log('create item error', err),
    });
  }


  onUpdateList(newTitle: string) {
    if (this.selectedListId == null) return;
    const id = this.selectedListId;


    this.listService.updateList(id, {title:newTitle}).subscribe({
      next: (res) => {
        console.log('STATUS', res.status)
        this.loadLists();
      },
      error: (err) => console.log('update list error', err),
    });
  }


  onDeleteList(listId: number) {
    this.listService.deleteList(listId).subscribe({
      next: (res) => {
        if (this.selectedListId === listId) {
          this.selectedListId = null;
          this.items = [];
        }
        this.loadLists();
        console.log("STATUS", res.status)
      },
      error: (err) => console.log('delete list error', err),
    });
  }


  onUpdateItem(payload: { id: number; body: Partial<TodoItemApi> }) {
    if (!this.selectedListId) return;

    const listId = this.selectedListId;

    this.itemService.updateItem(payload.id, payload.body).subscribe({
      next: (res) => {
        {
          this.loadItems(listId),
            console.log("STATUS: ", res.status)
        };
      },
      error: (err) => console.log('update item error', err),
    });
  }


  onDeleteItem(itemId: number) {
    if (!this.selectedListId) return;
    const listId = this.selectedListId;

    this.itemService.deleteItem(itemId).subscribe({
      next: (res) => {
        console.log('DELETE STATUS:', res.status);
        this.loadItems(listId);
        this.loadLists();
      },
      error: (err) => console.log(err),
    });
  }


  onToggleItemDone(payload: { id: number; completed: boolean }) {
    if (!this.selectedListId) return;
    const listId = this.selectedListId;

    this.itemService.updateItem(payload.id, { completed: payload.completed }).subscribe({
      next: (res) => {
        this.loadItems(listId),
          console.log("STATUS", res.status)
      },
      error: (err) => console.log('toggle done error', err),
    });
  }




  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
