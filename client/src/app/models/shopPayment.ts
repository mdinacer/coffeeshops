import { TransactionDirection } from "./TransactionDirection";


export interface ShopPayment {
    id: string;
    date: string;
    amount: number;
    description?: string;
    user?: string;
    direction: TransactionDirection;
    agentId: string;
    agent?: string;
}
