import { IUsers } from './IUsers.types';

export interface IComments {
  id: string;
  content: string;
  replies: IComments[];
  user: IUsers;
}
