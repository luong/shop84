import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Customer } from '@/entity/customer';
import { Product } from '@/entity/product';

@Entity({ name: 'CartItem' })
export class CartItem {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Customer, (customer) => customer.cartItems)
	customer: Customer;

	@ManyToOne(() => Product)
	product: Product;

	@Column({ type: 'int', default: 0 })
	quantity: number

	@CreateDateColumn({ type: 'timestamp', nullable: true })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true })
	updatedAt: Date;
}
