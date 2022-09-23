
export interface HistoryParams {
    pageNumber: number;
    pageSize: number;
    orderBy: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
    element?: string;
    action?: number;
}
