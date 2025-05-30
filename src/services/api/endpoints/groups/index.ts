import api from "../..";
import { GroupInfo } from "../../../../../types/group";

export async function getGroups(): Promise<GroupInfo[]> {
    const response = await api.get("/groups");
    return response.data;
}