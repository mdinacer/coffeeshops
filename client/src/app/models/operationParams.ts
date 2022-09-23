import { OperationType } from "./OperationType";


export interface OperationParams {
    pageNumber: number,
    pageSize: number,
    orderBy: string;
    type?: OperationType;
    startDate?: string | null;
    endDate?: string | null;
    agentId?: string
}