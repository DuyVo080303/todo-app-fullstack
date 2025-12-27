import { Controller, Body, Post, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LoginToDO } from './dto/login.dto';
// import { RegisterToDO } from './dto/register.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    
    // End point for Register/ Create a Route using HTTP Framework
    @Post('register')
    // register(@Body() registerDto: RegisterToDO) {
    //     return this.authService.register(registerDto.email, registerDto.password);
    //     // return this.authService.register()
    // } 
    register(@Body() dto: any) {
        console.log({dto})
        // return this.authService.register(registerDto.email, registerDto.password);
        return this.authService.register()
    }

    // End point for Login
    // @Post('login')
    // logIn(@Body() logInDto: LoginToDO) {
    //     // return this.authService.logIn(logInDto.email, logInDto.password)
    //     return this.authService.logIn()
    // }
}
