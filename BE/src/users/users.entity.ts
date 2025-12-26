// Create User Entity
import { Entity,Column,PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('users')
@Unique(['email'])
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({length:255})
    email: string

    @Column({name: 'password_hash', length:255})
    passwordHash: string
}
