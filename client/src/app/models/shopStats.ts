export interface ShopStats {
    annual: StatsElement;
    monthly: StatsElement;
    weekly: StatsElement;
    daily: StatsElement;
}


export interface StatsElementData {
    date: string;
    incoming: number;
    outgoing: number;

}

export interface StatsElement {
    title: string;
    elementData: StatsElementData[];
    totalIncoming: number;
    totalOutgoing: number;
    totalPurchases: number,
    totalPurchasesPaid: number,
    totalSales: number,
    totalSalesPaid: number,
    totalLoss: number,
}