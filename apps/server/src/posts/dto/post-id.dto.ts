import { IsDefined, IsString } from 'class-validator';

export class PostIdDto {
  @IsString()
  @IsDefined()
  id: string;
}
