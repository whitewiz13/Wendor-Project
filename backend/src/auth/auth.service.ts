
import { Injectable } from '@nestjs/common';
import ServiceMessage from '../utils/serviceMessage.util';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as twilio from 'twilio';

@Injectable()
export class AuthService {
    serviceMessage = new ServiceMessage();
    private client: twilio.Twilio;

    constructor(private jwtService: JwtService,
        private userService: UserService) {
        this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    async handleOTP(phoneNumber: string) {
        try {
            const res = await this.client.verify.v2.services(process.env.TWILIO_VERIFY_SID)
                .verifications.create({ to: phoneNumber, channel: "sms" });
            return this.serviceMessage.create({ status: res.status }, "OTP Sent successfully");
        } catch (error) {
            return this.serviceMessage.create(null, error.message);
        }
    }

    async verifyOTP(phoneNumber: string, otp: string) {
        try {
            const res = await this.client.verify.v2.services(process.env.TWILIO_VERIFY_SID)
                .verificationChecks.create({ to: phoneNumber, code: otp });
            if (!res.valid) {
                return this.serviceMessage.create(null, "Invalid OTP");
            }
            let data: any;
            let message: any;
            ({ data, message } = await this.userService.find(phoneNumber));
            if (!data) {
                ({ data, message } = await this.userService.create({ phoneNumber: phoneNumber }));
            }
            if (!data) {
                return this.serviceMessage.create(null, message);
            }
            const accessToken = await this.generateJWT(phoneNumber);
            return this.serviceMessage.create({ user: data, ...accessToken }, "OTP Verified successfully");
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
                return this.serviceMessage.create(null, "User not found");
            }
            return this.serviceMessage.create(user, "Data found");
        } catch (error) {
            return this.serviceMessage.create(null, error.message);
        }
    }
}