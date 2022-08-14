
export interface ProductBatch {
    id: string;
    date: Date;
    expiryDate: Date;
    quantity: number;
    lossQuantity: number;
    soldQuantity: number;
    expiredQuantity: number;
    remain: number;
    active: boolean;
    soldOut: boolean;
    expired: boolean;
}
