import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

@InputType()
export class UserUpdateDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  @Length(3, 60)
  readonly login?: string;

  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  @IsString()
  @Length(8, 64)
  readonly password?: string;
}
