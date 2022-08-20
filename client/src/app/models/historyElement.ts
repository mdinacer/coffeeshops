export interface HistoryElement {
    id: string;
    date: Date;
    userId: string;
    username: string;
    action: number;
    actionName: string;
    entityType: number;
    entityName: string;
    entityId: string;
}