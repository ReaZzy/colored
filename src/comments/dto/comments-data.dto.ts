import { IsDefined, IsOptional, IsString, Length } from 'class-validator';
import { Comments } from '../comments.entity';

export class CommentsDataDto {
  @IsDefined()
  @IsString()
  @Length(10, 350)
  content: string;

  @IsOptional()
  repliedTo: Comments;

  postId: string;

  userId: string;
}
