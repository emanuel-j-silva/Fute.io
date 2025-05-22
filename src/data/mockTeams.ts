export interface Team {
  name: string;
  players: string[];
}

export const mockTeams: Team[] = [
  {
    name: "Time A",
    players: ["Danilo", "Everton", "João Pedro", "Luiz Alberto"],
  },
  {
    name: "Time B",
    players: ["Gabriel", "Isaac", "Vanderlan", "Wesley"],
  },
  {
    name: "Time C",
    players: ["Carlos", "Yuri", "Paulo", "Eduardo"],
  },
];