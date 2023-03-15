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
            const newFullProduct = await this.productRepo.findOne({
                where: { id: newProduct.id },
                relations: ['user']
            });
            return this.serviceMessage.create(newFullProduct, "Product created successfully");
        } catch (error) {
            console.log(error);
            return this.serviceMessage.create(null, error?.message);
        }
    }

    async findAll() {
        try {
            const productList = await this.productRepo.find({ relations: ['user'] });
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

    async delete(id: number, userId: number) {
        try {
            const product = await this.productRepo.findOne({ where: { id: id } });
            if (userId !== product.createdBy) {
                return this.serviceMessage.create(null, "You are not authorized to delete! You can delete your own products.");
            }
            if (!product) {
                return this.serviceMessage.create(null, "Product not found!");
            }
            await this.productRepo.delete(id);
            return this.serviceMessage.create(product, "Product deleted successfully");
        } catch (error) {
            console.log(error);
            return this.serviceMessage.create(null, error?.message);
        }
    }
}