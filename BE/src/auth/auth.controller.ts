import { Controller, Body, Post, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { LoginTodoDto, RegisterTodoDto } from './dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)

    // End point for Register/ Create a Route using HTTP Framework
    @Post('register')
    register(@Body() registerDto: RegisterTodoDto) {
        return this.authService.register(registerDto)
    }

    // End point for Login
    @Post('login')
    logIn(@Body() logInDto: LoginTodoDto) {
        return this.authService.logIn(logInDto)
    }

    @Post('logout')
    @UseGuards(JwtGuard)
    async logOut() {
        return this.authService.logOut()
    }



}
