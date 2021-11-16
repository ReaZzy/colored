import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UserFindDto {
  @Field()
  @IsString()
  readonly find: string;
}
