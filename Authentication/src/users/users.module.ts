import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './services/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  controllers: [UsersController],
  providers: [UsersService,AuthService,{
    provide:APP_INTERCEPTOR,
    useClass:CurrentUserInterceptor
  }],
  imports:[TypeOrmModule.forFeature([User])]
})
export class UsersModule {}
