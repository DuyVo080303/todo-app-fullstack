import { Module } from '@nestjs/common';
import { TodoItemService } from './todo-item.service';

@Module({
  providers: [TodoItemService]
})
export class TodoItemModule {}
