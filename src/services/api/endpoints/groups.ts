import api from "..";

export async function getGroups() {
    const response = await api.get("/groups");
    return response.data;
}