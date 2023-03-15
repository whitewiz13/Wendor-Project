import { Controller, Res, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import ResponseMessage from '../utils/responseMessage.util';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    responseMessage = new ResponseMessage();
    constructor(private authService: AuthService) { }

    @Get('verify-auth')
    @ApiResponse({ status: 200, description: 'Verifies user login.' })
    @UseGuards(AuthGuard('jwt'))
    async verifyAuth(@Req() req: any, @Res() res: any) {
        try {
            return res.status(200).json(this.responseMessage.create(req.user, "Verfied Successfully", "SUCCESS"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(this.responseMessage.create(null, error?.message, "ERROR"));
        }
    }

    @Post('login')
    @ApiResponse({ status: 200, description: 'Send otp to the provided number' })
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
    @ApiResponse({ status: 200, description: 'Logs user in with otp' })
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