import { Field, ObjectType } from '@nestjs/graphql';
import { Users } from 'src/users/users.entity';

@ObjectType()
export class LoginDto {
  @Field(() => String)
  access_token: string;
  @Field(() => Users)
  user: Users;
}
