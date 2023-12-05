import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CouponScope } from '@/entity/coupon-scope';
import { CouponStatus } from '@/entity/coupon-status';
import { CouponValueType } from '@/entity/coupon-value-type';
import { OrderCoupon } from './order-coupon';

@Entity({ name: 'Coupon' })
export class Coupon {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 45 })
	name: string

	@Column({ type: 'float', default: 0 })
	value: number

	@Column({ type: 'enum', enum: CouponValueType, default: CouponValueType.FIXED })
	valueType: CouponValueType;

	@Column({ type: 'enum', enum: CouponScope, default: CouponScope.SUBTOTAL })
	scope: CouponScope;

	@Column({ type: 'enum', enum: CouponStatus, default: CouponStatus.ACTIVE })
	status: CouponStatus;

	@OneToMany(() => OrderCoupon, (orderCoupon) => orderCoupon.coupon)
  orderCoupons: OrderCoupon[]

	@CreateDateColumn({ type: 'timestamp', nullable: true })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true })
	updatedAt: Date;
}
