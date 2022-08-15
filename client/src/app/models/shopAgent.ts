import {ShopAgentType} from "./shopAgentType";


export interface ShopAgent {
    id: string,
    type: ShopAgentType,
    name: string,
    email?: string,
    phone?: string,
    mobile: string,
    address1?: string,
    address2?: string,
    total: number,
    paid: number,
    debt: number,
    operationsCount: number
    paymentsCount: number
}



