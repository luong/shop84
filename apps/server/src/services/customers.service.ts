import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '@/entity/customer';
import { AddCustomerRequest } from '@/dto/add-customer-request';

@Injectable()
export class CustomersService {
	constructor(
		@InjectRepository(Customer)
		private readonly customersRepository: Repository<Customer>
	) {}

	async add(addCustomerRequest: AddCustomerRequest): Promise<Customer> {
		const existed = await this.customersRepository.count({
			where: {
				email: addCustomerRequest.email
			}
		}) > 0;
		if (existed) {
			throw new ConflictException();
		}
		const result = await this.customersRepository.insert(addCustomerRequest);
		const id = result.identifiers[0].id;
		return this.findOne(id)!;
	}

	async findOne(id: string): Promise<Customer> {
		return await this.customersRepository.findOneByOrFail({ id: id });
	}

}
