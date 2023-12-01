export class Pagination<T> {
	items: Array<T>;
	totalItems: number | null;
	totalPages: number | null;
	currentPage: number | null;
	nextPage: number | null;
	prevPage: number | null;
}

export enum SortOrder {
	ASC = 'ASC',
	DESC = 'DESC'
}
