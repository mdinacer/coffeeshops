import {UserProfile} from "./userProfile";

export interface User {
    username: string,
    email: string,
    profile: UserProfile,
    token: string,
    shopId: string,
    roles: string[]
}