import { UserProfile } from "./userProfile";

export interface Shop {
    id: string;
    name: string;
    tablesCount: number;
    ownerId: string;
    owner: UserProfile;
    productsCount: number,
    operationsCount: number,
}