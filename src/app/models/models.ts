export interface Library {
    libraryId: string;
    name: string;
    isDeleted: boolean;
    // books[]: Book[];
}

export interface Book {
    bookId: string;
    name: string;
    authorName: string;
    description: string;
    libraryId: string;
    ownerId: string;
    isBooked: boolean;
    bookedDate: Date;
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