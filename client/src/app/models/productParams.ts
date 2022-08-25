export interface ProductParams {
    pageNumber: number,
    pageSize: number,
    orderBy: string;
    searchTerm?: string | null;
    categoryId?: string | null;
    showcase?: boolean | null;
    paginate?: boolean | null;
}

