import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@/entity/product';
import { SearchProduct } from '@/dto/search-product';
import { Constant } from '@/config/constant';
import { Pagination } from '@/dto/pagination';
import { Category } from '@/entity/category';

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product)
		private readonly productsRepository: Repository<Product>,
		@InjectRepository(Category)
		private readonly categoriesRepository: Repository<Category>
	) {}

	async findAll(searchProduct: SearchProduct): Promise<Pagination<Product>> {
		const pageValue = searchProduct.page ?? 1;
		const itemsPerPageValue = Math.min(searchProduct.itemsPerPage ?? Constant.MAX_ITEMS_PER_PAGE, Constant.MAX_ITEMS_PER_PAGE);
		const offset = (pageValue - 1) * itemsPerPageValue;

		const builder = this.productsRepository.createQueryBuilder();
		if (searchProduct.name) {
			builder.where('Product.name LIKE :name', {
				name: `%${searchProduct.name}%`
			});
		}
		if (searchProduct.categoryId) {
			builder.andWhere('Product.categoryId = :categoryId', {
				categoryId: searchProduct.categoryId
			});
		}
		if (searchProduct.priceFrom || searchProduct.priceTo) {
			if (searchProduct.priceFrom && searchProduct.priceTo) {
				builder.andWhere('Product.price >= :priceFrom AND Product.price <= :priceTo', {
					priceFrom: searchProduct.priceFrom,
					priceTo: searchProduct.priceTo
				});
			} else if (searchProduct.priceFrom) {
				builder.andWhere('Product.price >= :priceFrom', {
					priceFrom: searchProduct.priceFrom
				});
			} else if (searchProduct.priceTo) {
				builder.andWhere('Product.price <= :priceTo', {
					priceTo: searchProduct.priceTo
				});
			}
		}
		if (searchProduct.status) {
			builder.andWhere('Product.status = :status', {
				status: searchProduct.status
			});
		}
		const totalItems = await builder.getCount();
		if (searchProduct.sortBy && searchProduct.sortOrder) {
			builder.orderBy(`Product.${searchProduct.sortBy}`, searchProduct.sortOrder);
		}
		builder.offset(offset);
		builder.limit(itemsPerPageValue);

		builder.leftJoin('Product.category', 'Category')
			.addSelect(['Category.id', 'Category.name']);

		const items = await builder.getMany();
		const totalPages = Math.ceil(totalItems / itemsPerPageValue);
		const nextPage = pageValue + 1 <= totalPages ? pageValue + 1 : null;
		const prevPage = pageValue - 1 > 0 ? pageValue - 1 : null;

		return {
			items: items,
			totalItems: totalItems,
			totalPages: totalPages,
			currentPage: pageValue,
			prevPage: prevPage,
			nextPage: nextPage
		};
	}

	async findById(id: number): Promise<Product> {
		return this.productsRepository.findOneByOrFail({ id: id });
	}

	async findAllCategories(): Promise<Category[]> {
		return this.categoriesRepository.find({
			order: {
				name: 'ASC'
			}
		});
	}
}
