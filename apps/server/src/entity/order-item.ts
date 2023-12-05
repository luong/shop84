import { Order } from '@/entity/order';
import { Product } from '@/entity/product';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'OrderItem' })
export class OrderItem {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Order, (order) => order.orderItems)
	order: Order;

	@ManyToOne(() => Product)
	product: Product;

	@Column({ type: 'int', default: 0 })
	quantity: number

	@Column({ type: 'float', default: 0 })
	price: number

	@Column({ type: 'float', default: 0 })
	priceSet: number

	@CreateDateColumn({ type: 'timestamp', nullable: true })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true })
	updatedAt: Date;
}
