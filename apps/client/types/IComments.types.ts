import { IUsers } from './IUsers.types';

export interface IComments {
  id: string;
  createdDate: Date;
  content: string;
  replies: IComments[];
  user: IUsers;
}
