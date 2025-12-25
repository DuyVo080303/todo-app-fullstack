import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginToDO } from './dto/login.dto';
import { RegisterToDO } from './dto/register.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)

    @Post('register')
    register(@Body() registerDto: RegisterToDO) {
        return this.authService.register(registerDto.email, registerDto.password);
    }


    @Post('login')
    logIn(@Body() logInDto: LoginToDO) {
        return this.authService.logIn(logInDto.email, logInDto.password)
    }
}
