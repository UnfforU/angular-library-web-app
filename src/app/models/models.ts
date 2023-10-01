export interface Library {
    libraryId: string;
    name: string;
    isDeleted: boolean;
    // books[]: Book[];
}

export interface Login {
    username: string;
    password: string
}