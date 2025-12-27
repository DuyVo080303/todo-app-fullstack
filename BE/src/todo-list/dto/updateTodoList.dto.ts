import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class UpdateTodoListDto {
    // @IsInt()
    // id: number

    @IsString()
    @IsNotEmpty()
    title: string;
}