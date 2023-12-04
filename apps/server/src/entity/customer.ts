import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

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

	@CreateDateColumn({ type: 'timestamp', nullable: true })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true })
	updatedAt: Date;
}
