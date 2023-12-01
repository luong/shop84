import { AddCustomerRequest } from '@/dto/add-customer-request';
import { OkResponse } from '@/dto/ok-response';
import { Customer } from '@/entity/customer';
import { CustomersService } from '@/services/customers.service';
import { Body, Controller, Get, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { Auth } from '@/controllers/filters/auth.decorator';
import { Request } from 'express';

@Controller('customers')
export class CustomersController {
	constructor(private readonly customersService: CustomersService) { }

	@Post('/')
	@Auth()
	async add(@Body() addCustomerRequest: AddCustomerRequest, @Req() req: Request): Promise<OkResponse<Customer>> {
		addCustomerRequest.id = req.user!.id;
		return {
			statusCode: HttpStatus.OK,
			data: await this.customersService.add(addCustomerRequest)
		};
	}

	@Get(':id')
	@Auth()
	async findOne(@Param('id') id: string): Promise<OkResponse<Customer>> {
		return {
			statusCode: HttpStatus.OK,
			data: await this.customersService.findOne(id)
		};
	}
	
}

