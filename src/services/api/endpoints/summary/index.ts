import api from "../..";
import { SummaryInfo } from "../../../../../types/summary";

export async function getSummaryInfo(): Promise<SummaryInfo> {
    const response = await api.get("/summary");
    return response.data;
}