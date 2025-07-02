import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";

@Injectable()
export class MessagesService {
    constructor(public messagesRepo:MessagesRepository){
        
    }
    //find one message
    async findOne(id:string){
        return this.messagesRepo.findOne(id);
    }
    //find all messages
    async findAll(){
        return this.messagesRepo.findAll();
    }
    //create a message
    async create(content:string){
        return this.messagesRepo.create(content);
    }

    
}