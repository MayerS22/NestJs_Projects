import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "../users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService{
    constructor(private usersService:UsersService){}

    async signup(email:string,password:string){
        // check if the email is in use
        const user = await this.usersService.find(email);
        if(user.length){
            throw new BadRequestException('email in use');
        }
        // hash the users password
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password,salt,32)) as Buffer;
        // join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex');
        const newUser = await this.usersService.create(email,result);
        
        return newUser;

        // hash the users password
        // create a new user and save it
        // return the user
    }

    async signin(email:string,password:string){
        const [user] = await this.usersService.find(email);
        if(!user){
            throw new NotFoundException('user not found');
        }
        const [salt,storedHash] = user.password.split('.');
        const hash = (await scrypt(password,salt,32)) as Buffer;

        if(storedHash !== hash.toString('hex')){
            throw new BadRequestException('bad password');
        }
        return user;
        

    }
}