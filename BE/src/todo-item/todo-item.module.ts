import { Module } from '@nestjs/common';
import { TodoItemService } from './todo-item.service';
import { TodoItemController } from './todo-item.controller';

@Module({
  providers: [TodoItemService],
  controllers: [TodoItemController]
})
export class TodoItemModule {}
