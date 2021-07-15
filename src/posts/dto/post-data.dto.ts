import { IsDefined, IsString, Length } from 'class-validator';

export class PostDataDto {
  @IsString()
  @Length(3, 150)
  @IsDefined()
  readonly title: string;

  @IsString()
  @Length(3, 2500)
  @IsDefined()
  readonly content: string;
}
