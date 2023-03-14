import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    createdOn: Date

    @Column()
    createdBy: number

    @Column({ nullable: true })
    imageUrl: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'createdBy' })
    user: User;
}