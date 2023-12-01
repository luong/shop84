import { OkResponse } from '@/dto/ok-response';
import { ProductPagination } from '@/dto/product-pagination';
import { SearchProduct } from '@/dto/search-product';
import { Category } from '@/entity/category';
import { Product } from '@/entity/product';
import { ProductsService } from '@/services/products.service';
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get('/categories')
	async findAllCategories(): Promise<OkResponse<Category[]>> {
		const response = {
			statusCode: HttpStatus.OK,
			data: await this.productsService.findAllCategories()
		};
		return response;
	}
	
	@Get('/')
	async findAll(@Query() searchProduct: SearchProduct): Promise<OkResponse<ProductPagination>> {
		const response = {
			statusCode: HttpStatus.OK,
			data: await this.productsService.findAll(searchProduct)
		};
		return response;
	}

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<OkResponse<Product>> {
		const response = {
			statusCode: HttpStatus.OK,
			data: await this.productsService.findById(id)
		};
		return response;
	}
}
