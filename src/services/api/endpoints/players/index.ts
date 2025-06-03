import api from "../..";
import { PlayerInfo } from "../../../../../types/players";

export async function getAllPlayers(): Promise<PlayerInfo[]> {
    const response = await api.get("/players");
    return response.data;
}

export async function getTopPlayers(): Promise<PlayerInfo[]> {
    const response = await api.get("/players/top10");
    return response.data;
}