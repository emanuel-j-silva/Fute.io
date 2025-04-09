import api from "..";

export interface loginData{
    email: string;
    password: string;
}

export interface LoginResponse{
    token: string;
}

export async function loginApi(data: loginData): Promise<LoginResponse>{
    const response = await api.post<LoginResponse>("/auth/login", data);
    return response.data;
};