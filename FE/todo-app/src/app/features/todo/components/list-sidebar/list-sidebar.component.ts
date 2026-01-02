import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoList } from '../../models';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

// Load lists + select
// Search + Create New List + Select List
@Component({
  selector: 'app-list-sidebar',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './list-sidebar.component.html',
  styleUrl: './list-sidebar.component.scss',
})
export class ListSidebarComponent {
  @Input() lists: TodoList[] = []
  @Input() seletedListById: number | null = null

  @Output() selectList = new EventEmitter<number>()
  @Output() createList = new EventEmitter<string>()

  search = ''
  isCreating = false;
  newListTitle = '';

  onSelect(id: number) {
    this.selectList.emit(id)
  }


  startCreate() {
    this.isCreating = true;
    this.newListTitle = '';
  }

  cancelCreate() {
    this.isCreating = false;
  }

  submitCreate() {
    const title = this.newListTitle.trim();
    if (!title) return;
    this.createList.emit(title);   
    this.cancelCreate();
  }

}
