import { TeamInfo } from "./team";

export type DrawRequest = {
    playerIds: number[];
    numberOfTeams: number;
}

export type DrawInfo = {
    timestamp: string;
    teams: TeamInfo[];
}