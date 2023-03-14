import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Product } from "src/products/product.entity";
import { User } from "src/user/user.entity";

export const dbConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'kmekrllz',
    synchronize: true,
    entities: [User, Product],
}