import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemRowComponent } from '../item-row/item-row.component';
import { PriorityApi, TodoItem, TodoItemApi, TodoList } from '../../models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-panel',
  standalone: true,
  imports: [ItemRowComponent, FormsModule],
  templateUrl: './item-panel.component.html',
  styleUrl: './item-panel.component.scss',
})
export class ItemPanelComponent {
  @Input() selectedList: TodoList | null = null;
  @Input() items: TodoItem[] = []

  @Output() createItem = new EventEmitter<{ title: string; dueDate: string; priority: 'LOW' | 'MEDIUM' | 'HIGH' }>()
  @Output() editList = new EventEmitter<string>()
  @Output() deleteList = new EventEmitter<void>()
  @Output() editItem = new EventEmitter<{ id: number; body: Partial<TodoItemApi> }>();
  @Output() deleteItem = new EventEmitter<number>();
  @Output() toggleItemDone = new EventEmitter<{ id: number; completed: boolean }>();

  // UI State
  menuOpen = false;
  isCreating = false;
  isEditing = false;
  newTitle = '';
  renameTitle = '';
  newDueDate = '';
  newPriority: PriorityApi = 'LOW';

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }


  startCreate() {
    this.isCreating = true
    this.newTitle = '';
    this.newDueDate = '';
    this.newPriority = 'LOW';

  }

  cancelCreate() {
    this.isCreating = false;
  }

  submitCreate() {
    if (!this.selectedList) return;

    const title = this.newTitle.trim();
    if (!title) return;
    if (!this.newDueDate) return;

    // Convert YYYY-MM-DD -> ISO string for BE to use
    const dueDateIso = new Date(this.newDueDate).toISOString();

    this.createItem.emit({
      title,
      dueDate: dueDateIso,
      priority: this.newPriority,
    });

    this.cancelCreate();
  }

  startEdit() {
    if (!this.selectedList) return;
    this.isEditing = true;
    this.renameTitle = this.selectedList.name;
  }

  cancelEdit() {
    this.isEditing = false;
    this.renameTitle = '';
  }

  submitEdit() {
    if (!this.selectedList) return;
    const title = this.renameTitle.trim();

    if (!title || title === this.selectedList.name) {
      this.cancelEdit();
      return;
    }

    this.editList.emit(title);
    this.cancelEdit();
  }

  get getItems(): TodoItem[] {
    return this.items;
  }


}
