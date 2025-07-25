import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './services/auth.service';
import { User } from './users.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      find:(email:string)=>{
        return Promise.resolve([{
          id:1,email,password:'test'
        } as User]);
      },
      findOne:(id:number)=>{
        return Promise.resolve({
          id,email:'test@test.com',password:'test'
        } as User);
      },
      remove:(id:number)=>{
        return Promise.resolve({
          id,email:'test@test.com',password:'test'
        } as User);
      },
      update:(id:number,attrs:Partial<User>)=>{
        return Promise.resolve({
          id,email:'test@test.com',password:'test',...attrs
        } as User);
      },
    }
    fakeAuthService = {
      signin:(email:string,password:string)=>{
        return Promise.resolve({
          id:1,
          email,
          password
        } as User);
      },
      signup:(email:string,password:string)=>{
        return Promise.resolve({
          id:1,
          email,
          password
        } as User);
      },
    }
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[{
        provide:UsersService,
        useValue:fakeUsersService
      },{
        provide:AuthService,
        useValue:fakeAuthService
      }]
     
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
