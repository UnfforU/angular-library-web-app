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
    isBooked: boolean,
    ownerId: string,
    bookedDate: Date
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
    isAdmin: boolean;
}