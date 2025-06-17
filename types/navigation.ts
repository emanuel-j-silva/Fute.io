import { TeamInfo } from "./team";

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Draw: undefined;
  DrawResult: { teams: TeamInfo[], timestamp: string };
  Groups: undefined;
  GroupDetails: {title: string, groupId: string};
};
