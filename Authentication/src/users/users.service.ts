import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User)
        private repo:Repository<User>
    ){}

    create(email:string,password:string){
        const user = this.repo.create({email,password});
        return this.repo.save(user);
    }

    // find user by id (one record)
    findOne(id:number){
        if(!id){
            throw new NotFoundException("User not found");
        }
        return this.repo.findOneBy({id});
    }

    // find user by email (multiple records)
    find(email:string){
        if(!email){
            throw new NotFoundException("User not found");
        }
        return this.repo.find({where:{email}});
    }

    // update user by id
    async update(id:number,attrs:Partial<User>){
       const user = await this.findOne(id);
       if(!user){
        throw new NotFoundException("User not found");
       }
       Object.assign(user,attrs);
       return this.repo.save(user);

    }

    async remove(id:number){
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException("User not found");
        }
        return this.repo.remove(user);
    }
    
}
