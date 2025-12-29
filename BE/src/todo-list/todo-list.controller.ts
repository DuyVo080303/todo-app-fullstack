import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { TodoListService } from "./todo-list.service";
import { CreateTodoListDto, UpdateTodoListDto } from "./dto";
import { JwtGuard } from "src/auth/guard";
import { GetUser } from "src/decorator";



@UseGuards(JwtGuard)
@Controller('todo_list')
export class TodoListController {
    constructor(private todoList: TodoListService) { }
    @Get()
    getToDoList(@GetUser('id') userId: number) {
        return this.todoList.getToDoList(userId)
    }

    @Get(':id')
    getToDoListById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) todoListId: number) {
        const todoListById = this.todoList.getToDoListById(
            userId,
            todoListId
        )

        return todoListById
    }

    @Post()
    createToDoList(
        @GetUser('id') userId: number,
        @Body() createToDoList: CreateTodoListDto) {

        return this.todoList.createToDoList(
            createToDoList,
            userId
        )
    }

    @Put(':id')
    updateToDoListById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) todoListId: number,
        @Body() updateToDoList: UpdateTodoListDto
    ) {
        return this.todoList.updateToDoListById(userId, updateToDoList, todoListId);
    }

    @Delete(':id')
    removeToDoListById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) todoListId: number
    ) {
        return this.todoList.removeToDoListById(userId, todoListId);
    }

    // @Get(':id')
    // getToDoItembyToDoList(@GetUser('id') userId: number, @Param('id', ParseIntPipe) todoListId: number) {
    //     return this.todoList.getToDoItembyToDoList(userId, todoListId)
    // }
}



