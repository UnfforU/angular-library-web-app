import { UserRole } from "./models";

export interface Token {
    access_token: string
}

export interface DecodedToken {
    name: string;
    sub: string;
    role: UserRole;
    exp: number;
}