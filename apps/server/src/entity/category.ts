import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'Category' })
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@CreateDateColumn({ type: 'timestamp', nullable: true })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true })
	updatedAt: Date;
}
