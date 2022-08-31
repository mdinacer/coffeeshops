export interface InventoryItem {
    id: string;
    name: string;
    price: number;
    categoryId: string;
    category: string;
    quantity: number;
    soldQuantity: number;
    inventory: number;
    expiryDate?: Date;
    averageSale?: number;
    currentProfit: number;
    useInventory?: boolean;
}