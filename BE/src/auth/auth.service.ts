import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginTodoDto, RegisterTodoDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService : JwtService,
        private config: ConfigService
    ) { }

    async register(registerDto: RegisterTodoDto) {
        const existing = await this.prisma.user.findUnique({
            where: {
                email: registerDto.email
            }
        })
        if (existing) {
            throw new ConflictException('Email Already Exist')
        }

        const hashPass = await bcrypt.hash(registerDto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: registerDto.email,
                hash: hashPass,
                firstName: registerDto.firstName,
                lastName: registerDto.lastName,
            }
        })
        return this.signToken(user.id,user.email);
    }

    async logIn(logInDto: LoginTodoDto) {
        // Find user by email, if not create message
        const user = await this.prisma.user.findUnique({
            where: {
                email: logInDto.email
            }
        })

        if (!user) {
            throw new UnauthorizedException("Please sign up");
        }

        // If user exsit, but user enter wrong pass
        const pwMatched = await bcrypt.compare(logInDto.password,user.hash);
        if (!pwMatched) { throw new UnauthorizedException("Please enter you password again")}

        return this.signToken(user.id,user.email);
    }
    logOut(){
        return {
            message: 'Loggedout out successfully'
        }
    }

    async signToken (userId: number, email:string): Promise<{access_token: string}>{

        const payload = {sub: userId, email: email};
        const secret = this.config.get("JWT_SECRET")
        const jwtExpire = this.config.get('JWT_EXPIRES_IN')

        const token =  await this.jwtService.signAsync(
            payload,
            {expiresIn:jwtExpire,
            secret: secret}
        );

        return {
            access_token:token
        };
    }
}


