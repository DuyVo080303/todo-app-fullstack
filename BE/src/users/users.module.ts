import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';


// User Entity to UserModule and Export UserService for AuthModule use
@Module({
  providers: [UsersService],
  exports:[UsersService],
  controllers: [UsersController]
})
export class UserModule {}
