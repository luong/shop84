import { Order } from '@/entity/order';
import { Product } from '@/entity/product';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Coupon } from './coupon';

@Entity({ name: 'OrderCoupon' })
export class OrderCoupon {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Order, (order) => order.orderCoupons)
	order: Order;

	@ManyToOne(() => Coupon, (coupon) => coupon.orderCoupons)
	coupon: Coupon;

	@Column({ type: 'float', default: 0 })
	amount: number

	@CreateDateColumn({ type: 'timestamp', nullable: true })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true })
	updatedAt: Date;
}
