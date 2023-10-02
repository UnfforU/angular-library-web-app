export interface Token {
    access_token: string
}

export interface DecodedToken {
    userId: string;
    isAdmin: boolean;
    name: string;
    exp: number;
}