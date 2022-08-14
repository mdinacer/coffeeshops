import { ProductBatch } from "./ProductBatch";

export interface Product {
    id: string;
    name: string;
    description?: string;
    pictureUrl: string,
    publicId: string,
    price: number,
    categoryId: string;
    category: string;
    quantity: number;
    soldQuantity: number;
    inventory: number;
    showcase?: boolean;
    useInventory?: boolean;
    batches: ProductBatch[]
    expiryDate?: Date;
    averageSale?: number
    currentProfit: number
}

export interface ProductFull {
    id: string;
    name: string;
    description?: string;
    pictureUrl: string,
    publicId: string,
    price: number,
    categoryId: string;
    category: string;
    quantity: number;
    soldQuantity: number;
    inventory: number;
    showcase?: boolean;
    useInventory?: boolean;
    batches: ProductBatch[]
    expiryDate?: Date;
    averageSale?: number
    currentProfit: number
}

export interface ProductSmall {
    id: string;
    name: string;
    price: number,
}


