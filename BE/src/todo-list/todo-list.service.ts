import { Injectable, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoListDto, DeleteTodoListDto, UpdateTodoListDto } from './dto';
import { BadRequestException } from '@nestjs/common';

@Injectable({})
export class TodoListService {

    constructor(private prisma: PrismaService) { }
    async create(createToDoList: CreateTodoListDto, userId: number) {
        // Check if the user leave the title blank
        if (!createToDoList.title) {
            throw new BadRequestException('Title is required')
        }
        return await this.prisma.todoList.create({
            data: {
                title: createToDoList.title,
                user: {
                    connect: { id: userId }
                }
            }
        })
    }

    // Update to the todo_list
    // async update(updateTodoList: UpdateTodoListDto, userId: number, id:number) {
    //     if(!updateTodoList.title){
    //         throw new BadRequestException('Title is required')
    //     }
    //     return await this.prisma.todoList.update({
    //         where:{id, userId},
    //         data: {title: updateTodoList.title}
    //     })
    // }
    async update(
        id: number,
        updateTodoList: UpdateTodoListDto,
        userId: number
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



    async remove(removeToDoList: DeleteTodoListDto, userId: number) {
        return await this.prisma.todoList.delete({
            where: { id: removeToDoList.id, userId }
        })
    }

    // Readlist
    async findAll(userId: number): Promise<any> {
        return await this.prisma.todoList.findMany({
            where: { userId }
        })
    }

    // Readitem
    async findOne(id: number, userId: number) {
        return await this.prisma.todoList.findFirst({
            where: { id, userId }
        })
    }
}
