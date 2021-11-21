import { Field, ObjectType } from '@nestjs/graphql';

export class UserAvatarDto {
  id: string;
  file: string;
}

@ObjectType()
export class Avatar {
  @Field()
  avatar: string;
}
