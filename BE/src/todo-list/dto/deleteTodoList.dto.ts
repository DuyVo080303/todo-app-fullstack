import { IsInt } from "class-validator";

export class DeleteTodoListDto {
    @IsInt()
    id: number
}