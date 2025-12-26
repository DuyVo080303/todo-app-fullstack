import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';





@Module({
  imports:
    [
      // Load config from .env
      ConfigModule.forRoot({ isGlobal: true }),

      // Set up DB using config
      TypeOrmModule.forRootAsync(
        { 
          inject: [ConfigService],
          useFactory: (config :ConfigService) =>{
            return{
              type: 'postgres',
              host: config.get<string>('DB_HOST'),
              port: Number(config.get<string>('DB_PORT')),
              username:config.get<string>('DB_USER'),
              password:config.get<string>('DB_PASS'),
              database:config.get<string>('DB_NAME'),
              autoLoadEntities: true,
              synchronize: false
            }
          }
        }
      ),
      UserModule,
      AuthModule
    ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
