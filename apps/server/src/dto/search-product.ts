import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductStatus } from '@/entity/product-status';
import { SortOrder } from '@/dto/pagination';
import { ProductSortBy } from '@/dto/product-pagination';

export class SearchProduct {
	@IsString()
	@IsOptional()
	name: string;

	@IsInt()
	@IsOptional()
	categoryId: number;

	@IsNumber()
	@IsOptional()
	priceFrom: number;

	@IsNumber()
	@IsOptional()
	priceTo: number;

	@IsString()
	@IsOptional()
	status: ProductStatus;

	@IsInt()
	@IsOptional()
	page: number;

	@IsInt()
	@IsOptional()
	itemsPerPage: number;

	@IsEnum(ProductSortBy)
	@IsOptional()
	sortBy: ProductSortBy;

	@IsEnum(SortOrder)
	@IsOptional()
	sortOrder: SortOrder;
}
