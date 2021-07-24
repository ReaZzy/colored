import { IsDefined, IsOptional, IsString, Length } from 'class-validator';

export class CommentsDataDto {
  @IsDefined()
  @IsString()
  @Length(10, 350)
  content: string;

  @IsOptional()
  repliedTo: string;

  postId: string;

  userId: string;
}
