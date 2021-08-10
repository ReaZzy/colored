import { IsDefined, IsString, Length, Matches } from 'class-validator';

export class PostDataDto {
  @IsString()
  @Length(3, 2500)
  @IsDefined()
  readonly content: string;

  @IsString()
  @IsDefined()
  @Matches(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/gi, {
    message: 'invalid color',
  })
  color: string;

  userId: string;
}
