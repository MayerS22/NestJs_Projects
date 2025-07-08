import { Module ,ValidationPipe,MiddlewareConsumer} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule ,ConfigService} from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Report } from './reports/reports.entity';
import cookieSession from 'cookie-session';

@Module({
  imports: [UsersModule, ReportsModule, ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:`.env.${process.env.NODE_ENV}`,
  }), 
  TypeOrmModule.forRootAsync({
    inject:[ConfigService],
    useFactory:(configService:ConfigService)=>({
      type:'sqlite',
      database:configService.get<string>('DB_NAME'),
      entities:[User,Report],
      synchronize:true,
    }),
  })],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true,
    }),
  }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys:['asdfasdf'],
    })).forRoutes('*');
  }
}
