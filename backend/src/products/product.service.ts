import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';


@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepo: Repository<Product>) { }

    async create(product: any) {
        return await this.productRepo.save(product);
    }

    async findAll() {
        return await this.productRepo.find();
    }

    async delete(phoneNumber: string) {
        return await this.productRepo.find();
    }
}