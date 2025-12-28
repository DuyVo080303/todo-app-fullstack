import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterTodoDto{
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @MinLength(6)
    password:string;


    @IsString()
    @IsNotEmpty()
    firstName:string


    @IsString()
    @IsNotEmpty()
    lastName:string
}