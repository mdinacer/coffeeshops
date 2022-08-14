
export interface OperationElement {
    id?: number;
    date?: string,
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
    operationId?: number
    expiryDate?: Date;
}
