import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
// import { UsersService } from 'src/users/users.service';
// import { register } from 'module';
import { PrismaService } from 'src/prisma/prisma.service';
// import { User, TodoItem,TodoList } from 'generated/prisma/browser';

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {}
    // constructor(
    //     private userService: UsersService,
    //     private jwtService : JwtService
    // ) { }
    register() {
        return "Register"
    }
    // async register(email:string, pass:string): Promise<any> {
    //     const existing = await this.userService.findByEmail(email)
    //     if (existing?.email == email){
    //         throw new ConflictException('Email Already Exist')
    //     }

    //     const hashPass = await bcrypt.hash(pass,10);
    //     const user = await this.userService.createUser(email,hashPass);
    //     return {id: user.id, email: user.email}
    // }

    logIn() {
        return "Login"
    }
    // async logIn(email:string, pass:string): Promise<any>{
    //     const user = await this.userService.findByEmail(email);
    //     if (!user){
    //         throw new UnauthorizedException();
    //     }
    //     const ok = await bcrypt.compare(pass, user.passwordHash);
    //     if (!ok) {throw new UnauthorizedException();} 

    //     const payload = {sub: user.id, email: user.email}
    //     const accessToken = await this.jwtService.signAsync(payload)

    //     return{
    //         accessToken
    //     }
}


