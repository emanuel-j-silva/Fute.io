export type GroupInfo = {
    id: string;
    name: string;
    location: string;
    numberOfPlayers: number;
};

export type GroupRequest = {
    name: string;
    location: string;
}