import { Module , MiddlewareConsumer} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './services/auth.service';
import { CurrentUserMiddleWare } from 'src/users/middlewares/current-user.middleware';
@Module({
  controllers: [UsersController],
  providers: [UsersService,AuthService],
  imports:[TypeOrmModule.forFeature([User])]
})
export class UsersModule {
  configuare(consumer : MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleWare).forRoutes('*')
  }
}
