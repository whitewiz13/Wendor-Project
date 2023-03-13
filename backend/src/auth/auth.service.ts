
import { Injectable } from '@nestjs/common';
import ServiceMessage from './entity/serviceMessage.entity';

@Injectable()
export class AuthService {
    serviceMessage = new ServiceMessage();
    
    async phoneLogin(phoneNumber: string) {
        try {
            return null
        } catch (error) {
            return this.serviceMessage.create(null, error.message);
        }
    }
}