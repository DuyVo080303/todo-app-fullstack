import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { TodoListService } from "./todo-list.service";
import { CreateTodoListDto, DeleteTodoListDto, UpdateTodoListDto } from "./dto";


@Controller('todo_list')
export class TodoListController {
    constructor(private todoList: TodoListService) { }

    // Read is there any todo_list first
    @Get()
    async findAll(): Promise<any> {
        const userId = 2;
        return this.todoList.findAll(userId)
    }

    // Create todo_list
    @Post()
    create(@Body() createToDoList: CreateTodoListDto) {
        const userId = 2;
        console.log({ createToDoList })
        return this.todoList.create(createToDoList, userId)
    }

    // Update todo_list
    // @Put(':id')
    // update(@Param('id', ParseIntPipe) id: number, @Body() updateToDoList: UpdateTodoListDto) {
    //     const userId = 2;
    //     console.log({ updateToDoList })
    //     return this.todoList.update({id},updateToDoList, userId)
    // }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateToDoList: UpdateTodoListDto
    ) {
        const userId = 2;
        return this.todoList.update(id, updateToDoList, userId);
    }


    //  Read the todo_item
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        const userId = 2;
        return this.todoList.findOne(userId, id)
    }

    // Delete todo_list
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        const userId = 2;
        return this.todoList.remove({ id }, userId);
    }

}



// @Controller('todo-lists')
// export class TodoListController {
//   constructor(private readonly service: TodoListService) {}

//   @Get()
//   findAll() {
//     return this.service.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id', ParseIntPipe) id: number) {
//     return this.service.findOne(id);
//   }

//   @Post()
//   create(@Body() dto: CreateTodoListDto) {
//     return this.service.create(dto);
//   }

//   @Put(':id')
//   update(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() dto: UpdateTodoListDto,
//   ) {
//     return this.service.update(id, dto);
//   }

//   @Delete(':id')
//   remove(@Param('id', ParseIntPipe) id: number) {
//     return this.service.remove(id);
//   }
// }
