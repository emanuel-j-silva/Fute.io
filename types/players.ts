export type PlayerInfo = {
    id: number;
    name: string;
    overall: number;
    urlPhoto?: string;
}

export type PlayerRequest = {
    name: string;
    overall: string;
}