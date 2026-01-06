import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PriorityApi, TodoItem, TodoItemApi } from '../../models';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-row',
  imports: [DatePipe, FormsModule],
  templateUrl: './item-row.component.html',
  styleUrl: './item-row.component.scss',
})
export class ItemRowComponent {
  @Input() item!: TodoItem;

  @Output() editItem = new EventEmitter<{id: number; body: Partial<TodoItemApi>}>();
  @Output() deleteItem = new EventEmitter<number>();
  @Output() toggleDone = new EventEmitter<{ id: number; completed: boolean }>();

  // UI State
  isEditing = false;
  editTitle = '';
  editDueDate = '';      
  editPriority: PriorityApi = 'LOW';

  private toYmd(date: string | Date): string {
    const day = new Date(date);
    const yyyy = day.getFullYear();
    const mm = String(day.getMonth() + 1).padStart(2, '0');
    const dd = String(day.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  private toApiPriority(p: any): PriorityApi {
    const v = String(p).toUpperCase();
    if (v === 'HIGH') return 'HIGH';
    if (v === 'MEDIUM') return 'MEDIUM';
    return 'LOW';
  }

  onEdit() {
    this.isEditing = true;
    this.editTitle = this.item.title;
    this.editDueDate = this.toYmd(this.item.dueDate)
    this.editPriority = this.toApiPriority(this.item.priority)
  }

  onCancelEdit() {
    this.isEditing = false;
  }

  onSaveEdit() {
    const title = this.editTitle.trim();
    if (!title) return;
    if (!this.editDueDate) return;

    const body: Partial<TodoItemApi> = {};
    const dueDateIso = new Date(this.editDueDate).toISOString();
    const newTitle = this.editTitle.trim();
    const oldYmd = this.toYmd(this.item.dueDate);
    const oldPri = this.toApiPriority(this.item.priority);
    const newPri = this.editPriority;

    if (newTitle && newTitle !== this.item.title) {
      body.title = newTitle;
    }

    if (this.editDueDate && this.editDueDate !== oldYmd) {
      body.dueDate = new Date(this.editDueDate).toISOString();
    }

    if (newPri !== oldPri) {
      body.priority = newPri;
    }

    if (Object.keys(body).length === 0) {
      this.isEditing = false;
      return;
    }

    this.editItem.emit({
      id: this.item.id,
      body
    });

    this.isEditing = false;
  }

  onDelete() {
    this.deleteItem.emit(this.item.id)
  }

  onToggleDone(checked: boolean) {
    this.toggleDone.emit({ id: this.item.id, completed: checked })
  }
}
