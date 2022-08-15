import {TransactionDirection} from "./TransactionDirection";
import {TransactionType} from "./TransactionType";


export interface TransactionParams {
    pageNumber: number;
    pageSize: number;
    orderBy: string;
    direction?: TransactionDirection;
    type?: TransactionType;
    startDate?: string | null;
    endDate?: string | null;
}
