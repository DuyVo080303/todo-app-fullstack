import { IsEmail, MinLength } from "class-validator";

export class LoginToDO{
    @IsEmail()
    email:string;

    @MinLength(6)
    password:string;
}