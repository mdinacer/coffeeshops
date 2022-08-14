import { OperationElement } from "./OperationElement";
import { OperationType } from "./OperationType";

export interface Operation {
    id: string,
    date: string,
    agentId?: string
    agentName?: string
    elements: OperationElement[],
    total: number,
    paid: number,
    remain: number,
    table?: number,
    type: OperationType
}


