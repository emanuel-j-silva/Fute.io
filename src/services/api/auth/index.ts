import api from "..";
import { RegisterRequest, RegisterResponse } from "../../../../types/register";

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

export async function registerAccount(data: RegisterRequest): Promise<RegisterResponse> {
    try {
        const response = await api.post("/auth/register", data);
        return {
            message: response.data.message || "Conta criada com sucesso!",
            isError: false,
        }
       
    } catch (error: any) {
       if (error.response) {
            const errorMessage = error.response.data.errorMessage || "Erro desconhecido";
            return {
                message: errorMessage,
                isError: true,
            };
        } else if (error.request) {
            // Erro de conexão
            return {
                message: "Sem resposta do servidor. Verifique sua conexão.",
                isError: true,
            };
        } else {
            // Outro tipo de erro
            return {
                message: "Erro inesperado: " + error.message,
                isError: true,
            };
        }
    }
}