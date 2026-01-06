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
import { mapPriorityApiToUi } from '../../map/todo-item.mapper';

@Component({
  selector: 'app-todo-page',
  imports: [ListSidebarComponent, ItemPanelComponent, MatIconModule],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss',
})

export class TodoPageComponent implements OnInit {
  // Server State
  lists: TodoList[] = [];
  items: TodoItem[] = [];

  // UI state
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
  // UI State
  loadItems(listId: number) {
    this.itemService.getItems(listId).subscribe({
      next: (items) => {
        console.log('API returned items:', items, 'len=', items?.length);
        this.items = items;
        this.cdr.markForCheck();
      },
      error: (err) => console.log('getItems error', err),
    });
  }


  //UI State
  loadLists() {
    this.listService.getList().subscribe({
      next: (lists) => {
        this.lists = lists;


        if (this.selectedListId == null && this.lists.length) {
          const firstListId = this.lists[0].id
          this.selectedListId = firstListId;
          this.loadItems(firstListId)
          this.cdr.markForCheck();

        }
      },
      error: (err) => console.log(err),
    });
  }

  // Item duocjw load khi chi click vao nhuw cai list
  // Investigate tai sao no lai di call lai api de get toan bo list lai --> Khi nao minhf can load list --> cach de invesitagate --> bat debug 

  ngOnInit(): void {
    this.loadLists()
  }

  onSelectList(listId: number) {
    this.selectedListId = listId;
    this.loadItems(listId);
    console.log('Thành công có list')
  }


  onCreateList(title: string) {
    this.listService.createList({ title }).subscribe({
      next: (res) => {
        this.lists = [...this.lists, res.list];
        this.cdr.detectChanges();
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

        const createdItem = res.data;
        if (!createdItem) return;
        const createdItemUi: TodoItem = {
          id: createdItem.id,
          listId,
          title: createdItem.title,
          dueDate: createdItem.dueDate,
          priority: mapPriorityApiToUi(createdItem.priority),
          completed: createdItem.completed,
        }

        this.items = [createdItemUi, ...this.items];
        this.cdr.detectChanges()

      },
      error: (err) => console.log('create item error', err),
    });
  }


  onUpdateList(newTitle: string) {
    if (this.selectedListId == null) return;
    const id = this.selectedListId;

    this.listService.updateList(id, { title: newTitle }).subscribe({
      next: (res) => {
        // Cập nhật thủ công 
        // Phải dùng list.name vì HTML của bạn đang dùng {{list.name}}
        this.lists = this.lists.map(list =>
          list.id === id ? { ...list, name: newTitle } : list
        );
        console.log('STATUS', res.status)
        this.cdr.detectChanges();
      },
      error: (err) => console.log('update list error', err),
    });
  }


  onUpdateItem(payload: { id: number; body: Partial<TodoItemApi> }) {
    if (!this.selectedListId) return;

    const listId = this.selectedListId;

    this.itemService.updateItem(payload.id, payload.body).subscribe({
      next: (res) => {
        {
          const updateValue = res.item;
          if (!updateValue) return;

          const updatedUI: Partial<TodoItem> = {
            id: updateValue.id,
            listId,
            title: updateValue.title,
            dueDate: updateValue.dueDate,
            priority: updateValue.priority,
            completed: updateValue.completed,
          }
          this.items = this.items.map(item =>
            item.id === payload.id ? { ...item, ...updatedUI } : item
          );

          console.log("STATUS: ", res.status)
          this.cdr.detectChanges()
        };
      },
      error: (err) => console.log('update item error', err),
    });
  }

  onDeleteList(listId: number) {
    this.listService.deleteList(listId).subscribe({
      next: (res: any) => {
        // Cập nhật lại danh sách: Lọc bỏ item có id trùng với listId đã xóa
        // Lưu ý cú pháp filter: item => item.id !== listId
        this.lists = this.lists.filter(item => item.id !== listId);

        // Nếu list đang xóa chính là list đang được chọn hiển thị
        if (this.selectedListId === listId) {
          this.selectedListId = null;
          this.items = [];
        }
        console.log("Status:", res.status);

        this.cdr.detectChanges();
      },
      error: (err) => console.log('delete list error', err),
    });
  }

  onDeleteItem(itemId: number) {
    if (!this.selectedListId) return;
    const listId = this.selectedListId;

    this.itemService.deleteItem(itemId).subscribe({
      next: (res) => {
        
        this.items = this.items.filter(item => item.id !== itemId)
        console.log('DELETE STATUS:', res.status);
        this.cdr.detectChanges()
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
