import { Controller, Res, Get, Req, UseGuards, Post, Body, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './product.service';
import ResponseMessage from 'src/utils/responseMessage.util';
import { FileInterceptor } from "@nestjs/platform-express";
import { FirebaseStorageService } from 'src/firebaseStorage/firebaseStorage.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('products')
@Controller('products')
export class ProductController {
    responseMessage = new ResponseMessage();
    constructor(private productService: ProductService,
        private storageService: FirebaseStorageService) { }

    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor("image"))
    @ApiResponse({ status: 200, description: 'Returns a created product' })
    async createProduct(@UploadedFile() file: any, @Body() body: any, @Req() req: any, @Res() res: any) {
        try {
            let url: string;
            if (file) {
                url = await this.storageService.uploadFile(file);
            }
            const { data, message } = await this.productService.create({
                ...body,
                createdOn: new Date(),
                imageUrl: url,
                createdBy: req?.user?.data['id']
            });
            if (!data) {
                return res.status(500).json(this.responseMessage.create(null, message, "ERROR"));
            }
            return res.status(201).json(this.responseMessage.create(data, message, "SUCCESS"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(this.responseMessage.create(null, error?.message, "ERROR"));
        }
    }

    @Get('find')
    @UseGuards(AuthGuard('jwt'))
    async findProduct(@Req() req: any, @Res() res: any) {
        try {
            let data: any
            let message: any;
            if (req?.query?.userId) {
                ({ data, message } = await this.productService.findByUser(req?.query?.userId));
            } else {
                ({ data, message } = await this.productService.findAll());
            }
            if (!data) {
                return res.status(500).json(this.responseMessage.create(null, message, "ERROR"));
            }
            return res.status(200).json(this.responseMessage.create(data, message, "SUCCESS"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(this.responseMessage.create(null, error?.message, "ERROR"));
        }
    }

    @Delete('delete')
    @UseGuards(AuthGuard('jwt'))
    async deleteProduct(@Req() req: any, @Res() res: any) {
        try {
            const { data, message } = await this.productService.delete(req.query.id, req.user.data.id);
            if (!data) {
                return res.status(500).json(this.responseMessage.create(null, message, "ERROR"));
            }
            if (data?.imageUrl) {
                await this.storageService.deleteFile(data?.imageUrl);
            }
            return res.status(200).json(this.responseMessage.create(data, "Product deleted successfully", "SUCCESS"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(this.responseMessage.create(null, error?.message, "ERROR"));
        }
    }
}