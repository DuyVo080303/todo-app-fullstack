import { Transform } from "class-transformer"
import { IsBoolean, IsDate, IsEnum, IsOptional, IsString } from "class-validator"
import { TodoPriority } from "src/generated/prisma/enums"

export class UpdateoDoItemDto {
    @IsString()
    @IsOptional()
    title

    @IsEnum(TodoPriority, {
        message: 'priority must be HIGH, MEDIUM, or LOW',
    })
    @IsOptional()
    priorprity?: TodoPriority

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