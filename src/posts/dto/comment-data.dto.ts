import { IsDefined, IsString } from 'class-validator';

export class CommentDataDto {
  @IsDefined()
  @IsString()
  content: string;
}
