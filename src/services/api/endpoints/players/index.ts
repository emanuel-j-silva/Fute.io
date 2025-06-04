import api from "../..";
import { PlayerInfo, PlayerRequest } from "../../../../../types/players";
import { RegisterResponse } from "../../../../../types/register";

export async function getAllPlayers(): Promise<PlayerInfo[]> {
    const response = await api.get("/players");
    return response.data;
}

export async function getTopPlayers(): Promise<PlayerInfo[]> {
    const response = await api.get("/players/top10");
    return response.data;
}

export async function registerPlayer(data: PlayerRequest): Promise<RegisterResponse> {
    try {
        const response = await api.post("/players", data);
        return {
            message: response.data.message || "Jogador criado com sucesso!",
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