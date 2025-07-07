import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users.service';
import { User } from '../users.entity';
import { promisify } from 'util';
import { scrypt as _scrypt } from 'crypto';
const scrypt = promisify(_scrypt);

let service: AuthService;
let fakeUsersService: Partial<UsersService>;

describe('AuthService', () => {
    beforeEach(async () => {
        const users: User[] = [];
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string) => {
                const user = { id: Math.floor(Math.random() * 999999), email, password } as User;
                users.push(user);
                return Promise.resolve(user);
            }
            
        }
    
        const module = await Test.createTestingModule({
            providers: [AuthService,{
                provide: UsersService,
                useValue: fakeUsersService
            }]      
        }).compile();
    
        service = module.get(AuthService);
    
    })
    
    
    it ('can create an instance of auth service',async () => {
    
       
        expect(service).toBeDefined();
    
    })

    describe('signup', () => {
        

        it ('creates a new user with a salted and hashed password', async () => {

            const user = await service.signup('asdf@asdf.com', 'asdf');
    
            expect(user.password).not.toEqual('asdf');
    
            const [salt, hash] = user.password.split('.');
    
            expect(salt).toBeDefined();
            expect(hash).toBeDefined();
        })
        it ('throws an error if user signs up with email that is in use', async () => {
           await service.signup('asdf@asdf.com', 'asdf');
           try {
            await service.signup('asdf@asdf.com', 'asdf');
           } catch (err) {
            expect(err).toBeInstanceOf(BadRequestException);
           }
        })
       
    })
    it ('throws an error if signin is called with an unused email', async () => {
        let errorThrown = false;
        try {
            await service.signin('asdf@asdf.com', 'asdf');
        } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            errorThrown = true;
        }
        expect(errorThrown).toBe(true);
    })

    it('throws an error if a wrong password is provided', async () => {
        
        await service.signup('asdf@asdf.com', 'asdf');
        try {
            await service.signin('asdf@asdf.com', 'asdfasdf');
        } catch (err) {
            expect(err).toBeInstanceOf(BadRequestException);
        }
    });

    it('returns a user if correct password is provided', async () => {
        // Hash the password as AuthService would do
        await service.signup('asdf@asdf.com', 'asdf');
        const user = await service.signin('asdf@asdf.com', 'asdf');
        expect(user).toBeDefined();
    })


})