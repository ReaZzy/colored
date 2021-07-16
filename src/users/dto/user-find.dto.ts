import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserFindDto {
  @IsString()
  readonly find: string;
}
