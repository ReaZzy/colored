import { IComments } from './IComments.types';
import { IUsers } from './IUsers.types';

export interface IPosts {
  id: string;
  createdDate: Date;
  content: string;
  comments: IComments[];
  user: IUsers;
  likes: IUsers[];
}
