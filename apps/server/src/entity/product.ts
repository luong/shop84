import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProductStatus } from '@/entity/product-status';
import { Category } from '@/entity/category';

@Entity({ name: 'Product' })
export class Product {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number;

	@Column({ type: 'varchar', length: 150 })
	name: string;

	@Column({ type: 'tinytext', nullable: true })
	description: string;

	@Column({ type: 'float', nullable: true })
	price: number;

	@Column({ type: 'int', default: 0 })
	quantity: number;

	@ManyToOne(() => Category, { eager: true })
  category: Category

	@Column({ type: 'varchar', length: 200, nullable: true })
	image: string;

	@Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.ACTIVE })
	status: ProductStatus;

	@CreateDateColumn({ type: 'timestamp', nullable: true })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true })
	updatedAt: Date;
}
