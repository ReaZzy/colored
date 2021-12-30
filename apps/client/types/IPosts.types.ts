import { IComments } from './IComments.types';
import { IUsers } from './IUsers.types';

export interface IPosts {
  id: string;
  createdDate: string;
  content: string;
  color: string;
  comments: IComments[];
  user: IUsers;
  likes: IUsers[];
}
