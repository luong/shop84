import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from '@/entity/customer';
import { OrderStatus } from '@/entity/order-status';
import { Address } from '@/entity/address';
import { OrderItem } from '@/entity/order-item';
import { Payment } from '@/entity/payment';
import { OrderCoupon } from '@/entity/order-coupon';

@Entity({ name: 'Order' })
export class Order {
	@PrimaryColumn({ type: 'varchar', length: 50 })
	id: string;

	@ManyToOne(() => Customer)
	customer: Customer;

	@OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[]

	@OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[]

	@OneToMany(() => OrderCoupon, (orderCoupon) => orderCoupon.order)
  orderCoupons: OrderCoupon[]

	@Column({ type: 'float', default: 0 })
	originalSubtotal: number;

	@Column({ type: 'float', default: 0 })
	originalShipping: number;

	@Column({ type: 'float', default: 0 })
	originalTotal: number;

	@Column({ type: 'float', default: 0 })
	subtotal: number;

	@Column({ type: 'float', default: 0 })
	coupon: number;

	@Column({ type: 'float', default: 0 })
	shipping: number;

	@Column({ type: 'float', default: 0 })
	total: number;

	@Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
	status: OrderStatus;

	@Column({ type: 'simple-json', nullable: true })
	shippingAddress: Address;

	@Column({ type: 'timestamp', nullable: true })
	cancelledAt: Date;

	@CreateDateColumn({ type: 'timestamp', nullable: true })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true })
	updatedAt: Date;
}
