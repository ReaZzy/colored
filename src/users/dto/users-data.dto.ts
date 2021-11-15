import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEmail, IsString, Length } from 'class-validator';

@InputType()
export class UsersDataDto {
  @Field()
  @IsEmail()
  readonly email: string;

  @Field()
  @IsDefined()
  @Length(3, 60)
  readonly login: string;

  @Field()
  @IsDefined()
  @IsString()
  @Length(8, 64)
  readonly password: string;
}
