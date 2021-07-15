import { IsDefined, IsEmail, IsString, Length } from 'class-validator';

export class UsersDataDto {
  @IsEmail()
  readonly email: string;

  @IsDefined()
  @Length(3, 60)
  readonly login: string;

  @IsDefined()
  @IsString()
  @Length(8, 64)
  readonly password: string;
}
