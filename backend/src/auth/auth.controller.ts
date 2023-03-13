import { Controller, Req, Res, Post, Get, Body } from '@nestjs/common';
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
            return res.status(200).json(this.responseMessage.create("Hey", "User found", "SUCCESS"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(this.responseMessage.create(null, error?.message, "ERROR"));
        }
    }

}