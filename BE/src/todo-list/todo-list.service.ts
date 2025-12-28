import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoListDto, UpdateTodoListDto } from './dto';
import { BadRequestException } from '@nestjs/common';

@Injectable({})

export class TodoListService {
    constructor(private prisma: PrismaService) { }
    async getToDoList(userId: number): Promise<any> {
        return await this.prisma.todoList.findMany({
            where: { userId },
        })
    }

    async getToDoListById(userId: number, todoListId: number): Promise<any> {
        const todoListById = await this.prisma.todoList.findUnique({
            where: { userId, id: todoListId },
        })

        if (!todoListById) throw new NotFoundException("The todolist is not available")

        return todoListById
    }

    async createToDoList(createToDoList: CreateTodoListDto, userId: number) {
        if (!createToDoList.title) {
            throw new BadRequestException('Title is required')
        }

        const todoList = await this.prisma.todoList.create({
            data: {
                title: createToDoList.title,
                user: {
                    connect: { id: userId },
                }
            }
        })

        return todoList
    }

    async updateToDoListById(
        userId: number,
        updateTodoList: UpdateTodoListDto,
        id: number,
    ) {
        return this.prisma.todoList.update({
            where: {
                id,
                userId,
            },
            data: {
                title: updateTodoList.title,
            },
        });
    }


    async removeToDoListById(userId: number, todoListId: number) {
        const todoListById = await this.prisma.todoList.findFirst({
            where: { userId, id: todoListId },
        })

        if (!todoListById) throw new NotFoundException("There is not todo list for remove")

        return this.prisma.todoList.delete({
            where: { id: todoListId },
        });

    }


}
