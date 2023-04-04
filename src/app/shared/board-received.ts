export interface BoardRecieved {
  map(arg0: (element: any) => void): unknown;
  title: string;
  owner: string;
  users: string[];
  _id: string;
}
 