
import { Injectable } from '@nestjs/common';
import ServiceMessage from './entity/serviceMessage.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    serviceMessage = new ServiceMessage();
    constructor(private jwtService: JwtService,
        private userService: UserService) { }

    async handleOTP(phoneNumber: string) {
        try {
            console.log(phoneNumber);
            //SEND OTP FROM HERE AND SEND YES CONFIRM TO Client
            return this.serviceMessage.create({ phoneNumber }, "OTP Sent successfully");
        } catch (error) {
            return this.serviceMessage.create(null, error.message);
        }
    }

    async verifyOTP(phoneNumber: string, otp: string) {
        try {
            console.log(phoneNumber);
            console.log(otp);
            //VERIFY THE OTP                   
            let user = await this.userService.find(phoneNumber);
            if (!user) {
                user = await this.userService.create({ phoneNumber: phoneNumber });
            }
            const accessToken = await this.generateJWT(phoneNumber);
            return this.serviceMessage.create({ user: user, ...accessToken }, "OTP Verified successfully");
        } catch (error) {
            return this.serviceMessage.create(null, error.message);
        }
    }

    async generateJWT(phoneNumber: string) {
        const payload = { phoneNumber: phoneNumber };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async validateJWTLogin(phoneNumber: string) {
        try {
            //Find in database
            const user = await this.userService.find(phoneNumber);
            if (!user) {
                return this.serviceMessage.create(phoneNumber, "User not found");
            }
            return this.serviceMessage.create(user, "Data found");
        } catch (error) {
            return this.serviceMessage.create(null, error.message);
        }
    }
}