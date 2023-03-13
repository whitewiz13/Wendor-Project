import { Controller, Res, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import ResponseMessage from './entity/responseMessage.entity';

@Controller('auth')
export class AuthController {
    responseMessage = new ResponseMessage();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(private authService: AuthService) { }

    @Post('login')
    async userLogin(@Body() body: any, @Res() res: any) {
        try {
            const { phoneNumber } = body;
            const { data, message } = await this.authService.handleOTP(phoneNumber);
            if (!data) {
                return res.status(500).json(this.responseMessage.create(null, message, "ERROR"));
            }
            return res.status(200).json(this.responseMessage.create(data, message, "SUCCESS"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(this.responseMessage.create(null, error?.message, "ERROR"));
        }
    }

    @Post('login-otp')
    async userLoginOTP(@Body() body: any, @Res() res: any) {
        try {
            const { phoneNumber, otp } = body;
            const { data, message } = await this.authService.verifyOTP(phoneNumber, otp);
            if (!data) {
                return res.status(500).json(this.responseMessage.create(null, message, "ERROR"));
            }
            return res.status(200).json(this.responseMessage.create(data, message, "SUCCESS"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(this.responseMessage.create(null, error?.message, "ERROR"));
        }
    }
}