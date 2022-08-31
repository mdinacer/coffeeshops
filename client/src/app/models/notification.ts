export interface NotificationElement {
    type: "lowStock" | "expense",
    title: string,
    body: string,
    entityId: string,
    viewed: boolean;
    action?: () => void,
    pathTo?: string,
}