import { Controller, Delete, Get, Patch, Post, Param, ParseIntPipe, UseGuards, Body } from '@nestjs/common';
import { GetUser } from 'src/decorator';
import { TodoItemService } from './todo-item.service';
import { JwtGuard } from 'src/auth/guard';
import { CreateToDoItemDto, UpdateoDoItemDto } from './dto';

@UseGuards(JwtGuard)
@Controller()
export class TodoItemController {
    constructor(private todoItem: TodoItemService) { }
    @Get('todo_list/:listId/items')
    getToDoItembyToDoList(
        @GetUser('id') userId: number,
        @Param('listId', ParseIntPipe) todoListId: number) {
        return this.todoItem.getToDoItembyToDoList(userId, todoListId)
    }

    @Get('todo_item/:itemId')
    getToDoItemById(
        @GetUser('id') userId: number,
        @Param('itemId', ParseIntPipe) itemId: number,
    ) {
        return this.todoItem.getToDoItemById(userId, itemId);
    }

    @Post('todo_list/:listId/items')
    createToDoItemById(
        @GetUser('id') userId: number,
        @Param('listId', ParseIntPipe) todoListId: number,
        @Body() createToDoItem: CreateToDoItemDto
    ) {
        return this.todoItem.createToDoItemById(createToDoItem, userId, todoListId)
    }

    @Patch('todo_item/:itemId')
    updateToDoItemById(
        @GetUser('id') userId: number,
        @Param('itemId', ParseIntPipe) itemId: number,
        @Body() updateToDoItem: UpdateoDoItemDto
    ) {
        return this.todoItem.updateToDoItemById(updateToDoItem, userId, itemId)
    }

    @Delete('todo_item/:itemId')
    removeToDoItemtById(
        @GetUser('id') userId: number,
        @Param('itemId', ParseIntPipe) itemId: number,
    ) {
        return this.todoItem.removeToDoItemtById(userId, itemId)
    }
}
