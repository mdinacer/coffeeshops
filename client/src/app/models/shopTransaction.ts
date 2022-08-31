import { TransactionDirection } from "./TransactionDirection";
import { TransactionType } from "./TransactionType";

export interface ShopTransaction {
    id: string,
    date: string,
    amount: number,
    description?: string,
    user?: string,
    agentId?: string,
    agent?: string,
    direction: TransactionDirection
    type: TransactionType
}


