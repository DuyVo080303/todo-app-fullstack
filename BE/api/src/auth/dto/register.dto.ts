import { IsEmail, MinLength } from "class-validator";

export class RegisterToDO{
    @IsEmail()
    email:string;

    @MinLength(6)
    password:string;
}