import { Transform } from "class-transformer"
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { TodoPriority } from "src/generated/prisma/enums"

export class CreateToDoItemDto {
    @IsString()
    @IsNotEmpty()
    title

    @IsEnum(TodoPriority, {
        message: 'priority must be HIGH, MEDIUM, or LOW',
    })
    @IsOptional()
    priority?: TodoPriority

    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    @IsBoolean()
    completed?: boolean


    @IsOptional()
    @Transform(({ value }) => value ? new Date(value) : value)
    @IsDate()
    dueDate?: Date;
}