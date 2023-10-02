export interface Token {
    access_token: string
}

export interface DecodedToken {
    sub: string;
    isAdmin: string;
    name: string;
    exp: number;
}