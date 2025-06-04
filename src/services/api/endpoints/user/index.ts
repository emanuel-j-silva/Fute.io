import api from "../..";
import { UserInfo } from "../../../../../types/user";

export async function getUserInfo(): Promise<UserInfo> {
    const response = await api.get("/users/me");
    return response.data;
}