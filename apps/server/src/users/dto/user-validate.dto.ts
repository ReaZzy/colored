import { IsString } from 'class-validator';

export class UserValidateDto {
  @IsString()
  readonly find: string;

  @IsString()
  readonly password: string;
}
