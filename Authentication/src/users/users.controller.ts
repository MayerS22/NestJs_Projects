import { 
    Body, 
    Controller,
    Get,
    Post,
    Param,
    Query, 
    Delete,
    Patch, 
    Session,
    UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize} from '../interceptors/serialize.interseptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './services/auth.service';
import { User } from './users.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.gurad';


@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(private usersService:UsersService , private authService:AuthService){}

    @Post('/signup')
    async createUser(@Body() body:CreateUserDto,@Session() session:any){
        const user= await this.authService.signup(body.email,body.password);
        session.userId=user.id;
        return user;
    }
    // @Get('/whoami')
    // whoA 

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user:User){
        return user;
    }

    
    @Post('/signout')
    signOut(@Session() session:any){
        session.userId=null;
    }

    @Post('/signin')
    async signin(@Body() body:CreateUserDto,@Session() session:any){ 
        const user= await this.authService.signin(body.email,body.password);
        session.userId=user.id;
        return user;
    }

    @Get('/:id')
    findUser(@Param('id') id:string){
        console.log("I am running before the handler");
        return this.usersService.findOne(parseInt(id));
    }

    @Get()
    findAllUsers(@Query('email') email:string){
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string){
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string,@Body() body:UpdateUserDto){
        return this.usersService.update(parseInt(id),body);
    }
    
}
