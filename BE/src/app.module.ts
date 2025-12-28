import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TodoItemModule } from './todo-item/todo-item.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { PrismaModule } from './prisma/prisma.module';




@Module({
  imports:
    [
      // Load config from .env
      ConfigModule.forRoot({ isGlobal: true }),
      UserModule,
      AuthModule,
      TodoListModule,
      TodoItemModule,
      PrismaModule
    ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
