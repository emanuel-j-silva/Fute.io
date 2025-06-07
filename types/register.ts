export type RegisterRequest = {
    name: string;
    username: string;
    email: string;
    password: string;
};

export type RegisterResponse = {
    message: string;
    isError: boolean;
};