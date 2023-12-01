import { Pagination } from '@/dto/pagination';
import { Product } from '@/entity/product';

export class ProductPagination extends Pagination<Product> {}

export enum ProductSortBy {
  ID = 'id',
  NAME = 'name',
  PRICE = 'price'
}
