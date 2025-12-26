import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';

// Inject UserRespository into the UsserService 
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRespository: Repository<UserEntity>,
    ) {}

    findByEmail(email:string) {
        return this.userRespository.findOne({where: {email}})
    }

    createUser(email: string, passwordHash: string){
        const user = this.userRespository.create({ email, passwordHash});
        return this.userRespository.save(user);
    }

    findByID(id: number){
        return this.userRespository.findOne({where: {id}});
    }
}

