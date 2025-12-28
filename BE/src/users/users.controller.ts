import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/decorator/get-user.decorator';
import type { User } from 'src/generated/prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
    // Get/users --> using guard for route level
    @Get('me')
    getMe(@GetUser() user: User){
        return user
    }
}
