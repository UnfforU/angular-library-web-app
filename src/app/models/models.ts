export interface Library {
    libraryId: string,
    name: string,
    books: Book[]
}

export interface Book {
    bookId: string,
    name: string,
    authors: Author[],
    description: string,
    cover: string,
    libraryId: string,
    orders: Order[]
}

export interface Order {
    orderId: string,
    userId: string,
    bookId: string,
    startDateTime: Date,
    endDateTime: Date
}

export interface Author {
    authorId: string,
    name: string

}

export interface Login {
    username: string;
    password: string;
}

export interface User {
    userId: string;
    userName: string;
    password: string;
    userRole: UserRole;
}

export enum UserRole {
    defaultUser = 1,
    admin = 2
}