import { Controller, Res, Get, Req, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './product.service';
import ResponseMessage from 'src/utils/responseMessage.util';

@Controller('products')
export class ProductController {
    responseMessage = new ResponseMessage();
    constructor(private productService: ProductService) { }

    @Get('find')
    @UseGuards(AuthGuard('jwt'))
    async findProduct(@Req() req: any, @Res() res: any) {
        const products = await this.productService.findAll();
        return res.status(200).json(this.responseMessage.create(products, "Products fetched successfully", "SUCCESS"));
    }

    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    async createProduct(@Req() req: any, @Res() res: any) {
        const product = await this.productService.create({
            name: "One Plus",
            description: "Some new tv",
            price: 100,
            createdOn: new Date(),
            createdBy: "Me"
        });
        return res.status(200).json(this.responseMessage.create(product, "Products fetched successfully", "SUCCESS"));
    }
}