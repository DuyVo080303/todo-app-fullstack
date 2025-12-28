import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateToDoItemDto, UpdateoDoItemDto } from './dto';

@Injectable()
export class TodoItemService {
    constructor(private prisma: PrismaService) { }

    async getToDoItembyToDoList(userId: number, todoListId: number) {
        const todoListById = await this.prisma.todoList.findFirst({
            where: { userId, id: todoListId },
        })

        if (!todoListById) throw new NotFoundException("There is not Todo List ")

        const todoItemByListID = await this.prisma.todoItem.findMany({
            where: { listId: todoListId }
        })

        if (!todoItemByListID) throw new NotFoundException("No item in your list")

        return todoItemByListID

    }




    async getToDoItemById(userId: number, itemId: number) {
        const todoItembyId = await this.prisma.todoItem.findFirst({
            where: {
                id: itemId,
                list: {
                    userId: userId,
                },
            },
        });

        if (!todoItembyId) throw new NotFoundException("Create Items");

        return todoItembyId;
    }


    async createToDoItemById(
        createToDoItem: CreateToDoItemDto,
        userId: number,
        todoListId: number,
    ) {
        if (!createToDoItem.title) {
            throw new BadRequestException('Title is required');
        }

        // Check todo list is belong to which user
        const todoListById = await this.prisma.todoList.findFirst({
            where: {
                userId: userId,
                id: todoListId,
            },
        });

        if (!todoListById) throw new NotFoundException("The todolist is not available")

        // Create todo item
        const todoItem = await this.prisma.todoItem.create({
            data: {
                title: createToDoItem.title,
                priority: createToDoItem.priority,
                completed: createToDoItem.completed,
                dueDate: createToDoItem.dueDate,
                listId: todoListId,
            },
        });

        return todoItem;
    }



    async updateToDoItemById(updateToDoItem: UpdateoDoItemDto, userId: number, itemId: number) {
        // Check todo item is belong to which user
        const todoItembyId = await this.prisma.todoItem.findFirst({
            where: {
                id: itemId,
                list: {
                    userId: userId,
                },
            },
        });

        if (!todoItembyId) throw new NotFoundException("Create Items");

        // Update todo Item
        const todoItem = await this.prisma.todoItem.update({
            where: {
                id: itemId,
                list: {
                    userId: userId,
                },
            },

            data: {
                title: updateToDoItem.title,
                priority: updateToDoItem.priorprity,
                completed: updateToDoItem.completed,
                dueDate: updateToDoItem.dueDate,
            }
        })

        return todoItem;


    }

    async removeToDoItemtById(userId: number, itemId: number) {
        const todoItem = await this.prisma.todoItem.findFirst({
            where: {
                id: itemId,
                list: {
                    userId: userId,
                },
            }
        })

        if (!todoItem) throw new NotFoundException("There is not item for remove")

        return this.prisma.todoItem.delete({
            where: {
                id: itemId,
                list: {
                    userId: userId,
                },
            }
        })
    }
}
