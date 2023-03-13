import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

    async create(user: any) {
        return await this.userRepo.save(user);
    }

    async find(phoneNumber: string) {
        const user = await this.userRepo.findOne({ where: { phoneNumber: phoneNumber } });
        return user;
    }
}