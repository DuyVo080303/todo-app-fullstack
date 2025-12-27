import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findByEmail(email:string) {
        return await this.prisma.user.findUnique
        ({where: {email}})
    }

    async createUser(email: string, passwordHash: string){
        return await this.prisma.user.create({
            data: { 
                email: email,
                hash: passwordHash}})
    }

    async findByID(id: number){
        return await this.prisma.user.findUnique({where: {id}});
    }
}

