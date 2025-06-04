import api from "../..";
import { GroupInfo, GroupRequest } from "../../../../../types/group";
import { RegisterResponse } from "../../../../../types/register";

export async function getGroups(): Promise<GroupInfo[]> {
    const response = await api.get("/groups");
    return response.data;
}

export async function registerGroup(data: GroupRequest): Promise<RegisterResponse> {
    try {
        const response = await api.post("/groups", data);
        return {
            message: response.data.message || "Grupo criado com sucesso!",
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