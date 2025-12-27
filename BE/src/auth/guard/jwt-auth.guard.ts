// import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
// import { jwtConstants } from './constants';
// import { Request } from "express";

// @Injectable()
// export class AuthGuard implements CanActivate{
//     constructor (private jwtService:JwtService) {}

//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         const request = context.switchToHttp().getRequest()
//         const token = this.extractTokenFromHeader(request)
//         return true
//     }
// }