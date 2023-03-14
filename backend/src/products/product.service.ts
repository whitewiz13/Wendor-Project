import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import ServiceMessage from 'src/utils/serviceMessage.util';


@Injectable()
export class ProductService {
    serviceMessage = new ServiceMessage();

    constructor(@InjectRepository(Product) private productRepo: Repository<Product>) { }

    async create(productData: any) {
        try {
            const newProduct = await this.productRepo.save(productData);
            return this.serviceMessage.create(newProduct, "Product created successfully");
        } catch (error) {
            console.log(error);
            return this.serviceMessage.create(null, error?.message);
        }
    }

    async findAll() {
        try {
            const productList = await this.productRepo.find();
            return this.serviceMessage.create(productList, "Products fetched successfully");
        } catch (error) {
            console.log(error);
            return this.serviceMessage.create(null, error?.message);
        }
    }

    async findByUser(userId: number) {
        try {
            const productList = await this.productRepo.findBy({ createdBy: userId });
            return this.serviceMessage.create(productList, "Products fetched successfully");
        } catch (error) {
            console.log(error);
            return this.serviceMessage.create(null, error?.message);
        }
    }

    async delete(id: number) {
        try {
            const deleted = await this.productRepo.delete(id);
            return this.serviceMessage.create(deleted, "Product deleted successfully");
        } catch (error) {
            console.log(error);
            return this.serviceMessage.create(null, error?.message);
        }
    }
}