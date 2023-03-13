
import { Injectable } from '@nestjs/common';
import ServiceMessage from './entity/serviceMessage.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    serviceMessage = new ServiceMessage();
    constructor(private jwtService: JwtService) { }

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
            //Generate JWT
            return this.serviceMessage.create(await this.generateJWT(phoneNumber), "OTP Verified successfully");
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
            return this.serviceMessage.create(phoneNumber, "Data found");
        } catch (error) {
            return this.serviceMessage.create(null, error.message);
        }
    }
}