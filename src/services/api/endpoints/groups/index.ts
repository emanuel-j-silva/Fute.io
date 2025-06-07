import api from "../..";
import { DrawInfo, DrawRequest } from "../../../../../types/draw";
import { GroupInfo, GroupRequest, AssociatePlayersRequest } from "../../../../../types/group";
import { PlayerInfo } from "../../../../../types/players";
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

export async function associatePlayersToGroup(data: AssociatePlayersRequest, groupId: string): 
    Promise<RegisterResponse> {
    try {
        const response = await api.post(`/groups/${groupId}/players`, data);
        return {
            message: response.data.message || "Jogadores adicionados com sucesso!",
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

export async function getPlayersByGroup(groupId: string): Promise<PlayerInfo[]> {
    const response = await api.get(`/groups/${groupId}/players`);
    return response.data;
}

export async function getPlayersNotInGroup(groupId: string): Promise<PlayerInfo[]> {
    const response = await api.get(`/groups/${groupId}/players/not-in`);
    return response.data;
}

export async function performDraw(data: DrawRequest, groupId: string):
        Promise<DrawInfo | RegisterResponse> {
    
    try {
        const response = await api.post(`/groups/${groupId}/draws`, data);
        return{
            timestamp: response.data.timestamp,
            teams: response.data.teams
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