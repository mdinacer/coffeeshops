export interface AgentParams {
    pageNumber: number,
    pageSize: number,
    orderBy: string;
    searchTerm?: string | null;
    type: string;
    debtOnly?: boolean | null;
}