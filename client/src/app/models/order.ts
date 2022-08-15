import {v4 as uuid} from 'uuid';


export interface Table {
    id: number,
    active?: boolean
}

export interface Order {

    table: number,
    elements: OrderElement[];
    total: number | null;
}

export interface OrderElement {
    productId: string,
    productName: string,
    quantity: number,
    price: number,
    total?: number
}


export class EmptyOrder implements Order {
    id = uuid();
    table: number = 0;
    elements: OrderElement[] = [];
    total = 0;

    constructor(tableId?: number) {
        this.table = tableId || 0
    }



}