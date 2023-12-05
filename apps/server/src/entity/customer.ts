import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { CartItem } from '@/entity/cart-item';
import { Order } from '@/entity/order';
import { Address } from '@/entity/address';

@Entity({ name: 'Customer' })
export class Customer {
	@PrimaryColumn('uuid')
	id: string;

	@Column({ type: 'varchar', length: 45 })
	email: string;

	@Column({ type: 'varchar', length: 45, nullable: true })
	firstName: string;

	@Column({ type: 'varchar', length: 45, nullable: true })
	lastName: string;

	@OneToMany(() => CartItem, (cartItem) => cartItem.customer)
  cartItems: CartItem[]

	@OneToMany(() => Order, (order) => order.customer)
  orders: Order[]

	@OneToMany(() => Address, (address) => address.customer)
  addresses: Address[]

	@CreateDateColumn({ type: 'timestamp', nullable: true })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true })
	updatedAt: Date;
}
