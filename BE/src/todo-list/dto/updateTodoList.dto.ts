import {IsOptional, IsString } from "class-validator";

export class UpdateTodoListDto {
    @IsString()
    @IsOptional()
    title?: string;
}