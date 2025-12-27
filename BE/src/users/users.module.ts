import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';


// User Entity to UserModule and Export UserService for AuthModule use
@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [UsersService],
  exports:[UsersService]
})
export class UserModule {}
