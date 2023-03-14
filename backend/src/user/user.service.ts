import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import ServiceMessage from 'src/utils/serviceMessage.util';


@Injectable()
export class UserService {
    serviceMessage = new ServiceMessage();

    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

    async create(user: any) {
        try {
            const newUser = await this.userRepo.save(user);
            return this.serviceMessage.create(newUser, "User created successfully");
        } catch (error) {
            console.log(error);
            return this.serviceMessage.create(null, error.message);
        }
    }

    async find(phoneNumber: string) {
        try {
            const user = await this.userRepo.findOne({ where: { phoneNumber: phoneNumber } });
            return this.serviceMessage.create(user, "User fetched successfully");
        } catch (error) {
            console.log(error);
            return this.serviceMessage.create(null, error.message);
        }
    }
}