import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Customer } from '@/entity/customer';

@Entity({ name: 'Address' })
export class Address {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number;

	@ManyToOne(() => Customer)
	customer: Customer;

	@Column({ type: 'varchar', length: 45 })
	firstName: string;

	@Column({ type: 'varchar', length: 45 })
	lastName: string;

	@Column({ type: 'varchar', length: 45 })
	phone: string;

	@Column({ type: 'varchar', length: 200 })
	address1: string;

	@Column({ type: 'varchar', length: 200, nullable: true })
	address2: string;

	@Column({ type: 'varchar', length: 45 })
	city: string;

	@Column({ type: 'varchar', length: 45 })
	state: string;

	@Column({ type: 'varchar', length: 20 })
	country: string;

	@Column({ type: 'boolean', default: 0 })
	isDefault: boolean;

	@CreateDateColumn({ type: 'timestamp', nullable: true })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true })
	updatedAt: Date;
}
