import { Customer } from '@/entity/customer';
import { Order } from '@/entity/order';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PaymentMethod } from '@/entity/payment-method';
import { PaymentStatus } from '@/entity/payment-status';

@Entity({ name: 'Payment' })
export class Payment {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Order, (order) => order.payments)
	order: Order;

	@ManyToOne(() => Customer)
	customer: Customer;

	@Column({ type: 'float', default: 0 })
	amount: number

	@Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.BRAINTREE })
	method: PaymentMethod;

	@Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
	status: PaymentStatus;

	@CreateDateColumn({ type: 'timestamp', nullable: true })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true })
	updatedAt: Date;
}
